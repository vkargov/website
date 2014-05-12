---
layout: obsolete
title: "Contributing"
permalink: /old_site/Contributing/
redirect_from:
  - /Contributing/
---

Contributing
============

Track our various [Development Plans]({{site.github.url}}/old_site/Plans "Plans")

**Resources**

Users:
  [Downloads]({{site.github.url}}/old_site/Downloads "Downloads") | [Bug Reporting]({{site.github.url}}/old_site/Bugs "Bugs") | [Software]({{site.github.url}}/old_site/Software "Software")
 Developers:
  [API Docs](http://www.go-mono.com/docs/) | [Languages]({{site.github.url}}/old_site/Languages "Languages") | [Books]({{site.github.url}}/old_site/Books "Books") | [Roadmap]({{site.github.url}}/old_site/Mono_Project_Roadmap) | [Plans]({{site.github.url}}/old_site/Plans "Plans")
 Contributors:
  [Class Status]({{site.github.url}}/old_site/Resources#API_completion_status_pages "Resources") | [Build Status](http://wrench.mono-project.com/builds) | [Source Code]({{site.github.url}}/old_site/SourceCodeRepository)
 Community:
  [Mailing Lists]({{site.github.url}}/old_site/Mailing_Lists "Mailing Lists") | [Forums](http://www.go-mono.com/forums/) | [Chat]({{site.github.url}}/old_site/IRC "IRC") | [Blogs](http://www.go-mono.com/monologue/)
 FAQ:
  [General]({{site.github.url}}/old_site/FAQ:_General "FAQ: General") | [Technical]({{site.github.url}}/old_site/FAQ:_Technical "FAQ: Technical") | [Licensing]({{site.github.url}}/old_site/FAQ:_Licensing "FAQ: Licensing") | [Asp.net]({{site.github.url}}/old_site/FAQ:_ASP.NET "FAQ: ASP.NET") | [Security]({{site.github.url}}/old_site/FAQ:_Security "FAQ: Security") | [WinForms]({{site.github.url}}/old_site/FAQ:_Winforms "FAQ: Winforms")

Mono shipped its first release in June 2004, and the project is moving forward in various directions:

-   Performance, scalability, reliability improvements.
-   Implementing missing functionality
-   Implementing new features.

If you are interested in contributing, here are some pointers:

-   [Bugs]({{site.github.url}}/old_site/Bugs "Bugs"): Known bugs in Mono, you can look at which issues people are reporting.
-   [MoMA Migration Reports](/index.php?title=MoMA_Migration_Reports&action=edit&redlink=1 "MoMA Migration Reports (page does not exist)"): These are report of applications that people want to run with Mono, and the APIs that are missing or pending
-   [Resources]({{site.github.url}}/old_site/Resources "Resources"): Go to this page to take a look at the status of our API classes.

The project is under active development and has a vibrant community. If you are looking at ways of helping the project, you have come to the right web page.

<table>
<col width="100%" />
<tbody>
<tr class="odd">
<td align="left"><h2>Table of contents</h2>
<ul>
<li><a href="#Important_Rules">1 Important Rules</a></li>
<li><a href="#Work_Areas">2 Work Areas</a></li>
<li><a href="#Contributing_to_Mono">3 Contributing to Mono</a>
<ul>
<li><a href="#Contributing_to_the_Class_Libraries">3.1 Contributing to the Class Libraries</a></li>
<li><a href="#Testing_on_Various_Platforms">3.2 Testing on Various Platforms</a></li>
<li><a href="#Maintaining_Multiple_Trees">3.3 Maintaining Multiple Trees</a></li>
<li><a href="#Maintaining_Mono_git_submodules">3.4 Maintaining Mono git submodules</a></li>
<li><a href="#Debugging_with_Visual_Studio">3.5 Debugging with Visual Studio</a></li>
</ul></li>
<li><a href="#Ways_to_Contribute">4 Ways to Contribute</a></li>
</ul></td>
</tr>
</tbody>
</table>

Important Rules
===============

-   **Microsoft .NET source code:** If you have looked at Microsoft's proprietary implementation of .NET or their shared source code (which is also proprietary), you will not be able to contribute to Mono. If you would like to contribute in this area, be careful to not look into them in Visual Studio debugging experience.

-   **Contributing to the Mono runtime:** If you are submitting changes to the runtime, you must make sure to release your change under the MIT license before it is integrated. You may do so by adding this line to your commit messages:

<!-- -->

    This change in released under the MIT license.

-   In general, be careful when you are implementing free software and you have access to proprietary code. We need to make sure that we are not using someone else's copyrighted code accidentally.

-   **Reverse Engineering:** Do not use the **ildasm**, **reflector** or other equivalent tools program to disassemble proprietary code when you are planning to reimplement a class for Mono. If you have done this, we will not be able to use your code.

-   Please stick to published documentation for implementing any classes; when in doubt, post to the mailing list and discuss the possible approaches with others.

Microsoft also publishes a lot of code under open source licenses (MS-PL or Apache2). Looking at that code poses no problem. Some examples of code that you can look at include Microsoft's DLR, Microsoft's MEF, Microsoft's ASP.NET MVC, Microsoft's OData client stack and Microsoft's TinyCLR all licensed with open source compatible licenses.

Work Areas
==========

Our immediate goals are described in the [Mono Roadmap]({{site.github.url}}/old_site/Mono_Project_Roadmap), in general fixing bugs, improving performance, improving documentation, quality and the overall polish are all good ways of contributing to Mono. You can track the various technologies on the [Plans]({{site.github.url}}/old_site/Plans "Plans") page.

You might want to look at the project [To-Do]({{site.github.url}}/old_site/Todo "Todo") list, there are various medium and large projects there.

Those are just broad things that need to be worked on, but something that would help tremendously would be to help with small duties in the project that need to be addressed.

You can see what needs to be done in the class libraries [here](http://www.go-mono.com/status/)

You can help write documentation, please see [Mono Documentation Improvement Project]({{site.github.url}}/old_site/Mono_Documentation_Improvement_Project "Mono Documentation Improvement Project").

After you have commited your patches to our [SVN]({{site.github.url}}/old_site/SourceCodeRepository) repository, please use the [build status page](http://wrench.mono-project.com/builds) to keep track of how your changes affect the build. If your patches turned the tree red, please back it out immediately.

Contributing to Mono
====================

Contributing to the Class Libraries
-----------------------------------

For class library developers, we typically ask that you build NUnit tests to understand the API that you are going to implement, this will give you an insight beyond what the documentation states about the class. Then you should implement the code.

This is useful because once you submit the code it will help others not introduce problems in code that you depend on. Or if your project needs to be maintained and extended it will assist us in not breaking existing functionality that is implemented.

You should test the NUnit test cases on the real framework and make sure that all tests pass. Then these tests can be directly integrated into our build system.

When contributing to the class libraries, please have a look at our [Coding\_Guidelines]({{site.github.url}}/old_site/Coding_Guidelines "Coding Guidelines"). Note that our coding format is different from the default style from Visual Studio.

Testing on Various Platforms
----------------------------

Mono runs on many different platforms on many different architectures. However, no one can be expected to test their changes on all these platforms. To facilitate this, we run continuous builds for many platforms. The results are available on the [Mono Build Status](http://wrench.mono-project.com/) page.

This page allows you to ensure that:

-   Your change did not break the build on a platform.
-   Your unit tests pass on all platforms.

If you find that one of your commits broke something, don't panic! Just please either fix it or revert your change. This keeps Mono working for everyone, no matter what platform they use.

Maintaining Multiple Trees
--------------------------

If you want to maintain multiple active Mono installations in your system (a stable release, and one or more development releases) read the [Parallel Mono Environments]({{site.github.url}}/old_site/Parallel_Mono_Environments "Parallel Mono Environments") page.

Maintaining Mono git submodules
-------------------------------

Please read [Git Submodule Maintance](/index.php?title=Git_Submodule_Maintance&action=edit&redlink=1 "Git Submodule Maintance (page does not exist)")

Debugging with Visual Studio
----------------------------

If you plan on developing on Windows and testing your work using Visual Studio, you will want to edit the assembly that you are working on, and remove from the AssemblyInfo.cs file the line that "signs" your assembly.

By removing the assembly signing, this will allow you to create a test project that includes your new assembly and that will load this new version of the assembly instead of the assembly that lives in the GAC.

For example, if you want to debug Mono's Windows.Forms, you would load the solution from mcs/class/Managed.Windows.Forms, edit the AssemblyInfo to prevent the signing and rebuild the project. Then your test program can reference this assembly without loading the one from the GAC.

Ways to Contribute
==================

There are three different philosophical approaches to helping the Mono project:

-   The selfish way is packed with adventure. You start by building your own software, and start using the compiler and tools that come with Mono. Eventually you will run into missing features, or a bug in the software. Since we ship all the source code for Mono, you can start tracking down the problem. Depending on how much time you have to devote to the problem you could: [File a bug report]({{site.github.url}}/old_site/Bugs "Bugs"); track down the problem and provide a better [bug report]({{site.github.url}}/old_site/Bugs "Bugs"); fix the bug and provide a patch (you can [post it](mailto:mono-devel-list@ximian.com) to the [mono-devel mailing list](http://lists.ximian.com/mailman/listinfo/mono-devel-list); or discuss the solution on the mailing list). Ideally you will also write a [regression test]({{site.github.url}}/old_site/Test_Suite "Test Suite") so the bug does not get re-introduced in the future. You can also get contact with the hackers through [IRC]({{site.github.url}}/old_site/IRC "IRC") channels.

-   The altruistic way is probably the easiest because you get to pick a piece of Mono that you might want to work on. You can pick an unfinished [class]({{site.github.url}}/old_site/The_Class_Library "The Class Library") (from our [Class\_Status]({{site.github.url}}/old_site/Class_Status "Class Status")); help with the [documentation effort]({{site.github.url}}/old_site/Documentation "Documentation") ([mailing list for the documentation effort](http://lists.ximian.com/mailman/listinfo/mono-docs-list)); fix existing [bugs]({{site.github.url}}/old_site/Bugs); help with the [tools]({{site.github.url}}/old_site/Tools "Tools") or writing [tests]({{site.github.url}}/old_site/Test_Suite "Test Suite") that help make Mono more robust.

-   The **educational** way is an interesting one, because you pick a technology you are interested in, and work on that technology to learn the technology. If you are interested in it, please take a look at [this list]({{site.github.url}}/old_site/StudentProjects "StudentProjects") for possible projects.

