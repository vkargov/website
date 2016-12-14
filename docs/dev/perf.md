---
title: Performance analysis of the runtime
---

Purpose of the document
==========

The purpose of this section is to provide an insight on how well Mono performs on various tasks, to compare it with the performance of Microsoft's CoreCLR runtime as well as list some low hanging fruit that could help improve Mono's performance.

Currently the research is very critical and is only focused on the most outstanding flaws of the runtime, without giving any insight about the cases in which Mono performs _well_.

Methodology
==========
It makes most sense to pick such tests that show the worst performance on Mono in comparison to CoreCLR and see the most obvious causes of the slowdowns.
The research is conducted primarily on Linux, with the perf_events tool being the main performance analysis tool. Auxiliary tools (Intel VTune, Mono profiling, CoreCLR PerfView data dumps, etc) are considered and applied when it seems reasonable.
Common techniques of analysis
Getting assembly dumps of functions
Suppose we want to get the disassembly dumps of a function called NBodySystem:Advance.

Mono
----------

By 
using the verbose mode
```
MONO_VERBOSE_FUNCTION=FUNCTION_TO_DEBUG mono -v -v ...
```
Via debugger

```
$ gdb --args mono --break method NBodySystem:Advance ...
(gdb) r
(gdb) call mono_pmip ($rip)
$1 = 0xc460d0 " NBodySystem:Advance (double) {0xbf1f90} + 0x2b (0x40014ad0 0x40014fcc) [0xb7f500 - n-body.exe]"
gdb> disass 0x40014ad0,0x40014fcc
Dump of assembler code from 0x40014ad0 to 0x40014fcc:
   0x0000000040014ad0:    sub    $0x68,%rsp
   0x0000000040014ad4:    mov    %rbx,(%rsp)
 ...
```

CoreCLR
----------

```
$ COMPlus_JitDisasm='NBodySystem:Advance' coreclr ... ### coreclr needs to be the debug build, otherwise it will not work!
; Assembly listing for method NBodySystem:Advance(double):this
; Emitting BLENDED_CODE for X64 CPU with AVX
; optimized code
 ...
```
 
Finding hot spots
==========

On Linux
----------

Linux provides a standard tool that can find hotspots called [Perf](https://perf.wiki.kernel.org/index.php/Main_Page).
Make sure you are using debug versions of the runtimes and their libraries to get all the symbol info!
On Ubuntu, the tool resides in the linux-tools-common package.

Mono

``` bash
perf record mono --jitmap my_program.exe
perf report # essentially, this is an alternative to using the built-in profiler
```

CoreCLR

``` bash
COMPlus_PerfMapEnabled=1 perf record coreclr my_program.exe
perf report
```

On OS X
----------

On OS X the [Instruments](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/) tool can be used that is part of the Xcode toolset.

Since Instruments is unable to look up the symbols for dynamically generated (JITted) code, only the AOT mode will work:

``` bash
mono --aot --debug program.exe
mono program.exe
```

Converting the benchmarking assemblies to .NET Core.
==========
https://github.com/vkargov/cilcorebobulate is a dumb converter. Won't work if the type is not present in CoreCLR. (though in some cases it is easy to patch the assembly quite easily and with the minimum invasiveness)

Tests that can be converted and work are: except, n-body, db, specraytracer, health, euler, grandetracer, mandelbrot, hash2, objinst, binarytree, graph4, strcat, bh, compress, onelist, graph8, perimeter, bisort.

Miscellaneous
==========
Interesting CoreCLR debugging options:
COMPlus_JitDump=MethodName # Dump compiler state info. The "standard" way of looking into how and why RyuJIT behaves.
COMPLus_JItDumpIR=MethodName # dump textual representation of IR. '*' can be used to dump all. The drawn graph looks quite rudimentary
COMPlus_JitDumpFg=MethodName COMPlus_JitDumpFgPhase=PhaseName COMPlus_JitDumpFgDot=1 # dump IR for specified method
