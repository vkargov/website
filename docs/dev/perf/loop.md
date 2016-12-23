What misteries does can a simple loop hide?
==
Spoiler: >! none

<table>
<tr>
<th>Source code</th>
<th>Assembly</th>
<th>Comments</th>
</tr>
<tr>
<td>
<pre>
using System;

class Program {
    static void Main () {
	for (var i = 1; i <= 10; i++)
	    Console.WriteLine ("{0}", i);
    }
}
</pre>
</td>
<td>
<pre>
0000000000000000	subq	$0x8, %rsp
0000000000000004	movq	%r15, (%rsp)
0000000000000008	movl	$0x1, %r15d
000000000000000e	jmp	0x4d
0000000000000010	movabsq	$0x7f9de10492c0, %rdi   ## imm = 0x7F9DE10492C0
000000000000001a	movl	$0x14, %esi
000000000000001f	movabsq	$0x10adffe00, %r11      ## imm = 0x10ADFFE00
0000000000000029	callq	*%r11
000000000000002c	movq	%rax, %rsi
000000000000002f	movl	%r15d, 0x10(%rsi)
0000000000000033	movabsq	$0x10ae78150, %rdi      ## imm = 0x10AE78150
000000000000003d	movabsq	$0x10adfffac, %r11      ## imm = 0x10ADFFFAC
0000000000000047	callq	*%r11
000000000000004a	incl	%r15d
000000000000004d	cmpl	$0xa, %r15d
0000000000000051	jle	0x10
0000000000000053	movq	(%rsp), %r15
0000000000000057	addq	$0x8, %rsp
000000000000005b	retq
</pre>
<td>
</td>
</table>

<ul>
<li>Ok first of all, we don't have to copy r11/rdi every iteration. Ever heard of hoisting? (At least, assuming we can afford keeping 4 (2 with the next bullet point) registers occupied. I think we can.</li>
<li>We can reuse the boxed value, just do a simple "movl %r15d, 0x10(%rsi)", hence ridding ourselves of having to redo the box thing.</li>
</ul>
