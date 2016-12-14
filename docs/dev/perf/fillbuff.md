---
title: SHA1CryptoServiceProvider:FillBuff
---

Issues
==========
<ul>
<li>We can prove that all accessed elements lie within the array boundaries, so no boundary checks are really needed.</li>
<li>Actually, abcrem seems to work here! At least somewhat. This should be the default compilation mode for the function. Or maybe activate abcrem as a heuristic for hot functions with many boundary checks within loops?</li>
</ul>

Disassembly
==========

Obtained with -O=all,-aot.

<table>
<tr>
<th>Source code</th>
<th>Assembly</th>
<th>Comments</th>
</tr>
<tr>
<td>
<pre>
private static void FillBuff(uint[] buff)
{
	uint val;
	for (int i = 16; i < 80; i += 8)
	{
		val = buff[i - 3] ^ buff[i - 8] ^ buff[i - 14] ^ buff[i - 16];
		buff[i] = (val << 1) | (val >> 31);
		val = buff[i - 2] ^ buff[i - 7] ^ buff[i - 13] ^ buff[i - 15];
		buff[i + 1] = (val << 1) | (val >> 31);
		val = buff[i - 1] ^ buff[i - 6] ^ buff[i - 12] ^ buff[i - 14];
		buff[i + 2] = (val << 1) | (val >> 31);
		val = buff[i + 0] ^ buff[i - 5] ^ buff[i - 11] ^ buff[i - 13];
		buff[i + 3] = (val << 1) | (val >> 31);
		val = buff[i + 1] ^ buff[i - 4] ^ buff[i - 10] ^ buff[i - 12];
		buff[i + 4] = (val << 1) | (val >> 31);
		val = buff[i + 2] ^ buff[i - 3] ^ buff[i - 9] ^ buff[i - 11];
		buff[i + 5] = (val << 1) | (val >> 31);
		val = buff[i + 3] ^ buff[i - 2] ^ buff[i - 8] ^ buff[i - 10];
		buff[i + 6] = (val << 1) | (val >> 31);
		val = buff[i + 4] ^ buff[i - 1] ^ buff[i - 7] ^ buff[i - 9];
		buff[i + 7] = (val << 1) | (val >> 31);
	}
}
</pre>
</td>
<td>
<pre>
System_Security_Cryptography_SHA1Internal_FillBuff:
0000000000000000	subq	$0x18, %rsp
0000000000000004	movq	%r14, (%rsp)
0000000000000008	movq	%r15, 0x8(%rsp)
000000000000000d	movq	%rdi, %r15
0000000000000010	movl	$0x10, %r14d
0000000000000016	jmp	0x378
000000000000001b	leaq	(%rsp), %rsp
0000000000000020	movq	%r14, %rax
0000000000000023	subl	$0x3, %eax
0000000000000026	movslq	%eax, %rax
0000000000000029	cmpl	%eax, 0x18(%r15)
000000000000002d	jbe	0x3ed
0000000000000033	leaq	0x20(%r15,%rax,4), %rax
0000000000000038	movl	(%rax), %eax
000000000000003a	movq	%r14, %rcx
000000000000003d	subl	$0x8, %ecx
0000000000000040	movslq	%ecx, %rcx
0000000000000043	cmpl	%ecx, 0x18(%r15)
0000000000000047	jbe	0x3e6
000000000000004d	leaq	0x20(%r15,%rcx,4), %rcx
0000000000000052	movl	(%rcx), %ecx
0000000000000054	xorl	%ecx, %eax
0000000000000056	movq	%r14, %rcx
0000000000000059	subl	$0xe, %ecx
000000000000005c	movslq	%ecx, %rcx
000000000000005f	cmpl	%ecx, 0x18(%r15)
0000000000000063	jbe	0x3df
0000000000000069	leaq	0x20(%r15,%rcx,4), %rcx
000000000000006e	movl	(%rcx), %ecx
0000000000000070	xorl	%ecx, %eax
0000000000000072	movq	%r14, %rcx
0000000000000075	subl	$0x10, %ecx
0000000000000078	movslq	%ecx, %rcx
000000000000007b	cmpl	%ecx, 0x18(%r15)
000000000000007f	jbe	0x3d8
0000000000000085	leaq	0x20(%r15,%rcx,4), %rcx
000000000000008a	movl	(%rcx), %ecx
000000000000008c	xorl	%ecx, %eax
000000000000008e	movq	%rax, %rcx
0000000000000091	shll	%ecx
0000000000000093	shrl	$0x1f, %eax
0000000000000096	orl	%eax, %ecx
0000000000000098	movslq	%r14d, %rax
000000000000009b	cmpl	%eax, 0x18(%r15)
000000000000009f	jbe	0x3d1
00000000000000a5	leaq	0x20(%r15,%rax,4), %rax
00000000000000aa	movl	%ecx, (%rax)
00000000000000ac	movq	%r14, %rax
00000000000000af	subl	$0x2, %eax
00000000000000b2	movslq	%eax, %rax
00000000000000b5	leaq	0x20(%r15,%rax,4), %rax
00000000000000ba	movl	(%rax), %edx
00000000000000bc	movq	%r14, %rax
00000000000000bf	subl	$0x7, %eax
00000000000000c2	movslq	%eax, %rax
00000000000000c5	leaq	0x20(%r15,%rax,4), %rax
00000000000000ca	movl	(%rax), %eax
00000000000000cc	xorl	%eax, %edx
00000000000000ce	movq	%r14, %rax
00000000000000d1	subl	$0xd, %eax
00000000000000d4	movslq	%eax, %rax
00000000000000d7	leaq	0x20(%r15,%rax,4), %rax
00000000000000dc	movl	(%rax), %eax
00000000000000de	xorl	%eax, %edx
00000000000000e0	movq	%r14, %rax
00000000000000e3	subl	$0xf, %eax
00000000000000e6	movslq	%eax, %rax
00000000000000e9	leaq	0x20(%r15,%rax,4), %rax
00000000000000ee	movl	(%rax), %eax
00000000000000f0	xorl	%eax, %edx
00000000000000f2	leaq	0x1(%r14), %rax
00000000000000f6	movq	%rdx, %rcx
00000000000000f9	shll	%ecx
00000000000000fb	shrl	$0x1f, %edx
00000000000000fe	orl	%edx, %ecx
0000000000000100	movslq	%eax, %rax
0000000000000103	cmpl	%eax, 0x18(%r15)
0000000000000107	jbe	0x3ca
000000000000010d	leaq	0x20(%r15,%rax,4), %rax
0000000000000112	movl	%ecx, (%rax)
0000000000000114	movq	%r14, %rax
0000000000000117	decl	%eax
0000000000000119	movslq	%eax, %rax
000000000000011c	leaq	0x20(%r15,%rax,4), %rax
0000000000000121	movl	(%rax), %edx
0000000000000123	movq	%r14, %rax
0000000000000126	subl	$0x6, %eax
0000000000000129	movslq	%eax, %rax
000000000000012c	leaq	0x20(%r15,%rax,4), %rax
0000000000000131	movl	(%rax), %eax
0000000000000133	xorl	%eax, %edx
0000000000000135	movq	%r14, %rax
0000000000000138	subl	$0xc, %eax
000000000000013b	movslq	%eax, %rax
000000000000013e	leaq	0x20(%r15,%rax,4), %rax
0000000000000143	movl	(%rax), %eax
0000000000000145	xorl	%eax, %edx
0000000000000147	movq	%r14, %rax
000000000000014a	subl	$0xe, %eax
000000000000014d	movslq	%eax, %rax
0000000000000150	leaq	0x20(%r15,%rax,4), %rax
0000000000000155	movl	(%rax), %eax
0000000000000157	xorl	%eax, %edx
0000000000000159	leaq	0x2(%r14), %rax
000000000000015d	movq	%rdx, %rcx
0000000000000160	shll	%ecx
0000000000000162	shrl	$0x1f, %edx
0000000000000165	orl	%edx, %ecx
0000000000000167	movslq	%eax, %rax
000000000000016a	cmpl	%eax, 0x18(%r15)
000000000000016e	jbe	0x3c3
0000000000000174	leaq	0x20(%r15,%rax,4), %rax
0000000000000179	movl	%ecx, (%rax)
000000000000017b	movslq	%r14d, %rax
000000000000017e	leaq	0x20(%r15,%rax,4), %rax
0000000000000183	movl	(%rax), %edx
0000000000000185	movq	%r14, %rax
0000000000000188	subl	$0x5, %eax
000000000000018b	movslq	%eax, %rax
000000000000018e	leaq	0x20(%r15,%rax,4), %rax
0000000000000193	movl	(%rax), %eax
0000000000000195	xorl	%eax, %edx
0000000000000197	movq	%r14, %rax
000000000000019a	subl	$0xb, %eax
000000000000019d	movslq	%eax, %rax
00000000000001a0	leaq	0x20(%r15,%rax,4), %rax
00000000000001a5	movl	(%rax), %eax
00000000000001a7	xorl	%eax, %edx
00000000000001a9	movq	%r14, %rax
00000000000001ac	subl	$0xd, %eax
00000000000001af	movslq	%eax, %rax
00000000000001b2	leaq	0x20(%r15,%rax,4), %rax
00000000000001b7	movl	(%rax), %eax
00000000000001b9	xorl	%eax, %edx
00000000000001bb	leaq	0x3(%r14), %rax
00000000000001bf	movq	%rdx, %rcx
00000000000001c2	shll	%ecx
00000000000001c4	shrl	$0x1f, %edx
00000000000001c7	orl	%edx, %ecx
00000000000001c9	movslq	%eax, %rax
00000000000001cc	cmpl	%eax, 0x18(%r15)
00000000000001d0	jbe	0x3bc
00000000000001d6	leaq	0x20(%r15,%rax,4), %rax
00000000000001db	movl	%ecx, (%rax)
00000000000001dd	leaq	0x1(%r14), %rax
00000000000001e1	movslq	%eax, %rax
00000000000001e4	leaq	0x20(%r15,%rax,4), %rax
00000000000001e9	movl	(%rax), %edx
00000000000001eb	movq	%r14, %rax
00000000000001ee	subl	$0x4, %eax
00000000000001f1	movslq	%eax, %rax
00000000000001f4	leaq	0x20(%r15,%rax,4), %rax
00000000000001f9	movl	(%rax), %eax
00000000000001fb	xorl	%eax, %edx
00000000000001fd	movq	%r14, %rax
0000000000000200	subl	$0xa, %eax
0000000000000203	movslq	%eax, %rax
0000000000000206	leaq	0x20(%r15,%rax,4), %rax
000000000000020b	movl	(%rax), %eax
000000000000020d	xorl	%eax, %edx
000000000000020f	movq	%r14, %rax
0000000000000212	subl	$0xc, %eax
0000000000000215	movslq	%eax, %rax
0000000000000218	leaq	0x20(%r15,%rax,4), %rax
000000000000021d	movl	(%rax), %eax
000000000000021f	xorl	%eax, %edx
0000000000000221	leaq	0x4(%r14), %rax
0000000000000225	movq	%rdx, %rcx
0000000000000228	shll	%ecx
000000000000022a	shrl	$0x1f, %edx
000000000000022d	orl	%edx, %ecx
000000000000022f	movslq	%eax, %rax
0000000000000232	cmpl	%eax, 0x18(%r15)
0000000000000236	jbe	0x3b5
000000000000023c	leaq	0x20(%r15,%rax,4), %rax
0000000000000241	movl	%ecx, (%rax)
0000000000000243	leaq	0x2(%r14), %rax
0000000000000247	movslq	%eax, %rax
000000000000024a	leaq	0x20(%r15,%rax,4), %rax
000000000000024f	movl	(%rax), %edx
0000000000000251	movq	%r14, %rax
0000000000000254	subl	$0x3, %eax
0000000000000257	movslq	%eax, %rax
000000000000025a	leaq	0x20(%r15,%rax,4), %rax
000000000000025f	movl	(%rax), %eax
0000000000000261	xorl	%eax, %edx
0000000000000263	movq	%r14, %rax
0000000000000266	subl	$0x9, %eax
0000000000000269	movslq	%eax, %rax
000000000000026c	leaq	0x20(%r15,%rax,4), %rax
0000000000000271	movl	(%rax), %eax
0000000000000273	xorl	%eax, %edx
0000000000000275	movq	%r14, %rax
0000000000000278	subl	$0xb, %eax
000000000000027b	movslq	%eax, %rax
000000000000027e	leaq	0x20(%r15,%rax,4), %rax
0000000000000283	movl	(%rax), %eax
0000000000000285	xorl	%eax, %edx
0000000000000287	leaq	0x5(%r14), %rax
000000000000028b	movq	%rdx, %rcx
000000000000028e	shll	%ecx
0000000000000290	shrl	$0x1f, %edx
0000000000000293	orl	%edx, %ecx
0000000000000295	movslq	%eax, %rax
0000000000000298	cmpl	%eax, 0x18(%r15)
000000000000029c	jbe	0x3ae
00000000000002a2	leaq	0x20(%r15,%rax,4), %rax
00000000000002a7	movl	%ecx, (%rax)
00000000000002a9	leaq	0x3(%r14), %rax
00000000000002ad	movslq	%eax, %rax
00000000000002b0	leaq	0x20(%r15,%rax,4), %rax
00000000000002b5	movl	(%rax), %edx
00000000000002b7	movq	%r14, %rax
00000000000002ba	subl	$0x2, %eax
00000000000002bd	movslq	%eax, %rax
00000000000002c0	leaq	0x20(%r15,%rax,4), %rax
00000000000002c5	movl	(%rax), %eax
00000000000002c7	xorl	%eax, %edx
00000000000002c9	movq	%r14, %rax
00000000000002cc	subl	$0x8, %eax
00000000000002cf	movslq	%eax, %rax
00000000000002d2	leaq	0x20(%r15,%rax,4), %rax
00000000000002d7	movl	(%rax), %eax
00000000000002d9	xorl	%eax, %edx
00000000000002db	movq	%r14, %rax
00000000000002de	subl	$0xa, %eax
00000000000002e1	movslq	%eax, %rax
00000000000002e4	leaq	0x20(%r15,%rax,4), %rax
00000000000002e9	movl	(%rax), %eax
00000000000002eb	xorl	%eax, %edx
00000000000002ed	leaq	0x6(%r14), %rax
00000000000002f1	movq	%rdx, %rcx
00000000000002f4	shll	%ecx
00000000000002f6	shrl	$0x1f, %edx
00000000000002f9	orl	%edx, %ecx
00000000000002fb	movslq	%eax, %rax
00000000000002fe	cmpl	%eax, 0x18(%r15)
0000000000000302	jbe	0x3a7
0000000000000308	leaq	0x20(%r15,%rax,4), %rax
000000000000030d	movl	%ecx, (%rax)
000000000000030f	leaq	0x4(%r14), %rax
0000000000000313	movslq	%eax, %rax
0000000000000316	leaq	0x20(%r15,%rax,4), %rax
000000000000031b	movl	(%rax), %edx
000000000000031d	movq	%r14, %rax
0000000000000320	decl	%eax
0000000000000322	movslq	%eax, %rax
0000000000000325	leaq	0x20(%r15,%rax,4), %rax
000000000000032a	movl	(%rax), %eax
000000000000032c	xorl	%eax, %edx
000000000000032e	movq	%r14, %rax
0000000000000331	subl	$0x7, %eax
0000000000000334	movslq	%eax, %rax
0000000000000337	leaq	0x20(%r15,%rax,4), %rax
000000000000033c	movl	(%rax), %eax
000000000000033e	xorl	%eax, %edx
0000000000000340	movq	%r14, %rax
0000000000000343	subl	$0x9, %eax
0000000000000346	movslq	%eax, %rax
0000000000000349	leaq	0x20(%r15,%rax,4), %rax
000000000000034e	movl	(%rax), %eax
0000000000000350	xorl	%eax, %edx
0000000000000352	leaq	0x7(%r14), %rax
0000000000000356	movq	%rdx, %rcx
0000000000000359	shll	%ecx
000000000000035b	shrl	$0x1f, %edx
000000000000035e	orl	%edx, %ecx
0000000000000360	movslq	%eax, %rax
0000000000000363	cmpl	%eax, 0x18(%r15)
0000000000000367	jbe	0x390
000000000000036d	leaq	0x20(%r15,%rax,4), %rax
0000000000000372	movl	%ecx, (%rax)
0000000000000374	addl	$0x8, %r14d
0000000000000378	cmpl	$0x50, %r14d
000000000000037c	jl	0x20
0000000000000382	movq	(%rsp), %r14
0000000000000386	movq	0x8(%rsp), %r15
000000000000038b	addq	$0x18, %rsp
000000000000038f	retq
0000000000000390	movl	$0x40, %esi
0000000000000395	movl	$0x108, %edi            ## imm = 0x108
000000000000039a	movabsq	$0x10d3df1c0, %r11      ## imm = 0x10D3DF1C0
00000000000003a4	callq	*%r11
00000000000003a7	movl	$0xa5, %esi
00000000000003ac	jmp	0x395
00000000000003ae	movl	$0x10b, %esi            ## imm = 0x10B
00000000000003b3	jmp	0x395
00000000000003b5	movl	$0x171, %esi            ## imm = 0x171
00000000000003ba	jmp	0x395
00000000000003bc	movl	$0x1d7, %esi            ## imm = 0x1D7
00000000000003c1	jmp	0x395
00000000000003c3	movl	$0x239, %esi            ## imm = 0x239
00000000000003c8	jmp	0x395
00000000000003ca	movl	$0x2a0, %esi            ## imm = 0x2A0
00000000000003cf	jmp	0x395
00000000000003d1	movl	$0x308, %esi            ## imm = 0x308
00000000000003d6	jmp	0x395
00000000000003d8	movl	$0x328, %esi            ## imm = 0x328
00000000000003dd	jmp	0x395
00000000000003df	movl	$0x344, %esi            ## imm = 0x344
00000000000003e4	jmp	0x395
00000000000003e6	movl	$0x360, %esi            ## imm = 0x360
00000000000003eb	jmp	0x395
00000000000003ed	movl	$0x37a, %esi            ## imm = 0x37A
00000000000003f2	jmp	0x395
</pre>
</td>
<td>

</td>
</tr>
</table>
