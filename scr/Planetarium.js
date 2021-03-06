/***********************************************************************
 Planetarium
 
 Copyright (c) 2018 Sergio Lindau

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
/***********************************************************************/

var $linha_now = new Array();
var $now_split = new Array();

$linha_now[1]="-1;Sol;279;-40;Invisível;-;12h;sol";
$linha_now[2]="-1;Lua;221;-67;Invisível;-8.3;09h;lua";
$linha_now[3]="-1;Mercúrio;285;-31;Invisível;-1.3;12h;mercurio";
$linha_now[4]="-1;Vênus;262;-58;Invisível;-3.9;10h;venus";
$linha_now[5]="-1;Marte;292;-12;Invisível;1.8;14h;marte";
$linha_now[6]="-1;Júpiter;104;28;Visível;-2.6;00h;jupiter";
$linha_now[7]="-1;Saturno;113;1;Visível;1.0;03h;saturno";
$linha_now[8]="-1;Urano;243;-68;Invisível;5.9;09h;urano";
$linha_now[9]="-1;Netuno;140;-53;Invisível;7.9;06h;netuno";
$linha_now[10]="-1;Plutão;115;-2;Invisível;14.2;03h;plutao";
$linha_now[11]="-1;Siding_Spring;115;-2;Invisível;14.2;03h;siding_spring";
$linha_now[12]="-1;209P;115;-2;Invisível;14.2;03h;209p";
$linha_now[13]="-1;R1_Lovejoy;115;-2;Invisível;14.2;03h;r1_lovejoy";

var $linha_efem = new Array();
$linha_efem[1]="0;Sol;165;-88;Invisível;-;12h;sol";
$linha_efem[2]="0;Lua;107;-37;Invisível;-8.3;09h;lua";
$linha_efem[3]="0;Mercúrio;278;-81;Invisível;-1.3;12h;mercurio";
$linha_efem[4]="0;Vênus;107;-69;Invisível;-3.9;10h;venus";
$linha_efem[5]="0;Marte;278;-60;Invisível;1.8;14h;marte";
$linha_efem[6]="0;Júpiter;88;78;Visível;-2.6;00h;jupiter";
$linha_efem[7]="0;Saturno;96;49;Visível;1.0;03h;saturno";
$linha_efem[8]="0;Urano;102;-55;Invisível;5.9;09h;urano";
$linha_efem[9]="0;Netuno;100;-9;Invisível;7.9;06h;netuno";
$linha_efem[10]="0;Plutão;98;46;Visível;14.2;03h;plutao";
$linha_efem[11]="0;Siding_Spring;98;46;Visível;14.2;03h;siding_spring";
$linha_efem[12]="0;209P;98;46;Visível;14.2;03h;209p";
$linha_efem[13]="0;R1_Lovejoy;98;46;Visível;14.2;03h;r1_lovejoy";
$linha_efem[14]="1;Sol;94;-75;Invisível;-;12h;sol";
$linha_efem[15]="1;Lua;99;-24;Invisível;-8.3;09h;lua";
$linha_efem[16]="1;Mercúrio;77;-85;Invisível;-1.3;12h;mercurio";
$linha_efem[17]="1;Vênus;96;-55;Invisível;-3.9;10h;venus";
$linha_efem[18]="1;Marte;276;-74;Invisível;1.8;14h;marte";
$linha_efem[19]="1;Júpiter;298;88;Visível;-2.6;00h;jupiter";
$linha_efem[20]="1;Saturno;92;63;Visível;1.0;03h;saturno";
$linha_efem[21]="1;Urano;94;-42;Invisível;5.9;09h;urano";
$linha_efem[22]="1;Netuno;94;4;Visível;7.9;06h;netuno";
$linha_efem[23]="1;Plutão;93;60;Visível;14.2;03h;plutao";
$linha_efem[24]="1;Siding_Spring;93;60;Visível;14.2;03h;siding_spring";
$linha_efem[25]="1;209P;93;60;Visível;14.2;03h;209p";
$linha_efem[26]="1;R1_Lovejoy;93;60;Visível;14.2;03h;r1_lovejoy";
$linha_efem[27]="2;Sol;88;-62;Invisível;-;12h;sol";
$linha_efem[28]="2;Lua;93;-11;Invisível;-8.3;09h;lua";
$linha_efem[29]="2;Mercúrio;83;-72;Invisível;-1.3;12h;mercurio";
$linha_efem[30]="2;Vênus;89;-41;Invisível;-3.9;10h;venus";
$linha_efem[31]="2;Marte;288;-87;Invisível;1.8;14h;marte";
$linha_efem[32]="2;Júpiter;270;74;Visível;-2.6;00h;jupiter";
$linha_efem[33]="2;Saturno;84;77;Visível;1.0;03h;saturno";
$linha_efem[34]="2;Urano;88;-28;Invisível;5.9;09h;urano";
$linha_efem[35]="2;Netuno;88;18;Visível;7.9;06h;netuno";
$linha_efem[36]="2;Plutão;87;74;Visível;14.2;03h;plutao";
$linha_efem[37]="2;Siding_Spring;87;74;Visível;14.2;03h;siding_spring";
$linha_efem[38]="2;209P;87;74;Visível;14.2;03h;209p";
$linha_efem[39]="2;R1_Lovejoy;87;74;Visível;14.2;03h;r1_lovejoy";
$linha_efem[40]="3;Sol;83;-48;Invisível;-;12h;sol";
$linha_efem[41]="3;Lua;87;3;Visível;-8.3;09h;lua";
$linha_efem[42]="3;Mercúrio;81;-58;Invisível;-1.3;12h;mercurio";
$linha_efem[43]="3;Vênus;84;-27;Invisível;-3.9;10h;venus";
$linha_efem[44]="3;Marte;84;-79;Invisível;1.8;14h;marte";
$linha_efem[45]="3;Júpiter;266;60;Visível;-2.6;00h;jupiter";
$linha_efem[46]="3;Saturno;336;88;Visível;1.0;03h;saturno";
$linha_efem[47]="3;Urano;82;-14;Invisível;5.9;09h;urano";
$linha_efem[48]="3;Netuno;82;32;Visível;7.9;06h;netuno";
$linha_efem[49]="3;Plutão;53;87;Visível;14.2;03h;plutao";
$linha_efem[50]="3;Siding_Spring;53;87;Visível;14.2;03h;siding_spring";
$linha_efem[51]="3;209P;53;87;Visível;14.2;03h;209p";
$linha_efem[52]="3;R1_Lovejoy;53;87;Visível;14.2;03h;r1_lovejoy";
$linha_efem[53]="4;Sol;79;-34;Invisível;-;12h;sol";
$linha_efem[54]="4;Lua;80;16;Visível;-8.3;09h;lua";
$linha_efem[55]="4;Mercúrio;78;-45;Invisível;-1.3;12h;mercurio";
$linha_efem[56]="4;Vênus;79;-14;Invisível;-3.9;10h;venus";
$linha_efem[57]="4;Marte;83;-65;Invisível;1.8;14h;marte";
$linha_efem[58]="4;Júpiter;262;47;Visível;-2.6;00h;jupiter";
$linha_efem[59]="4;Saturno;274;75;Visível;1.0;03h;saturno";
$linha_efem[60]="4;Urano;77;-1;Invisível;5.9;09h;urano";
$linha_efem[61]="4;Netuno;73;45;Visível;7.9;06h;netuno";
$linha_efem[62]="4;Plutão;276;78;Visível;14.2;03h;plutao";
$linha_efem[63]="4;Siding_Spring;276;78;Visível;14.2;03h;siding_spring";
$linha_efem[64]="4;209P;276;78;Visível;14.2;03h;209p";
$linha_efem[65]="4;R1_Lovejoy;276;78;Visível;14.2;03h;r1_lovejoy";
$linha_efem[66]="5;Sol;75;-21;Invisível;-;12h;sol";
$linha_efem[67]="5;Lua;73;29;Visível;-8.3;09h;lua";
$linha_efem[68]="5;Mercúrio;75;-31;Invisível;-1.3;12h;mercurio";
$linha_efem[69]="5;Vênus;73;-1;Invisível;-3.9;10h;venus";
$linha_efem[70]="5;Marte;80;-51;Invisível;1.8;14h;marte";
$linha_efem[71]="5;Júpiter;258;33;Visível;-2.6;00h;jupiter";
$linha_efem[72]="5;Saturno;268;61;Visível;1.0;03h;saturno";
$linha_efem[73]="5;Urano;70;13;Visível;5.9;09h;urano";
$linha_efem[74]="5;Netuno;60;58;Visível;7.9;06h;netuno";
$linha_efem[75]="5;Plutão;268;64;Visível;14.2;03h;plutao";
$linha_efem[76]="5;Siding_Spring;268;64;Visível;14.2;03h;siding_spring";
$linha_efem[77]="5;209P;268;64;Visível;14.2;03h;209p";
$linha_efem[78]="5;R1_Lovejoy;268;64;Visível;14.2;03h;r1_lovejoy";
$linha_efem[79]="6;Sol;70;-8;Invisível;-;12h;sol";
$linha_efem[80]="6;Lua;64;41;Visível;-8.3;09h;lua";
$linha_efem[81]="6;Mercúrio;70;-18;Invisível;-1.3;12h;mercurio";
$linha_efem[82]="6;Vênus;66;12;Visível;-3.9;10h;venus";
$linha_efem[83]="6;Marte;77;-38;Invisível;1.8;14h;marte";
$linha_efem[84]="6;Júpiter;253;20;Visível;-2.6;00h;jupiter";
$linha_efem[85]="6;Saturno;263;48;Visível;1.0;03h;saturno";
$linha_efem[86]="6;Urano;62;25;Visível;5.9;09h;urano";
$linha_efem[87]="6;Netuno;36;68;Visível;7.9;06h;netuno";
$linha_efem[88]="6;Plutão;264;51;Visível;14.2;03h;plutao";
$linha_efem[89]="6;Siding_Spring;264;51;Visível;14.2;03h;siding_spring";
$linha_efem[90]="6;209P;264;51;Visível;14.2;03h;209p";
$linha_efem[91]="6;R1_Lovejoy;264;51;Visível;14.2;03h;r1_lovejoy";
$linha_efem[92]="7;Sol;64;5;Visível;-;12h;sol";
$linha_efem[93]="7;Lua;50;52;Visível;-8.3;09h;lua";
$linha_efem[94]="7;Mercúrio;66;-5;Invisível;-1.3;12h;mercurio";
$linha_efem[95]="7;Vênus;58;25;Visível;-3.9;10h;venus";
$linha_efem[96]="7;Marte;73;-24;Invisível;1.8;14h;marte";
$linha_efem[97]="7;Júpiter;248;7;Visível;-2.6;00h;jupiter";
$linha_efem[98]="7;Saturno;259;34;Visível;1.0;03h;saturno";
$linha_efem[99]="7;Urano;52;37;Visível;5.9;09h;urano";
$linha_efem[100]="7;Netuno;352;72;Visível;7.9;06h;netuno";
$linha_efem[101]="7;Plutão;260;37;Visível;14.2;03h;plutao";
$linha_efem[102]="7;Siding_Spring;260;37;Visível;14.2;03h;siding_spring";
$linha_efem[103]="7;209P;260;37;Visível;14.2;03h;209p";
$linha_efem[104]="7;R1_Lovejoy;260;37;Visível;14.2;03h;r1_lovejoy";
$linha_efem[105]="8;Sol;56;17;Visível;-;12h;sol";
$linha_efem[106]="8;Lua;28;60;Visível;-8.3;09h;lua";
$linha_efem[107]="8;Mercúrio;59;7;Visível;-1.3;12h;mercurio";
$linha_efem[108]="8;Vênus;47;36;Visível;-3.9;10h;venus";
$linha_efem[109]="8;Marte;68;-11;Invisível;1.8;14h;marte";
$linha_efem[110]="8;Júpiter;242;-6;Invisível;-2.6;00h;jupiter";
$linha_efem[111]="8;Saturno;255;21;Visível;1.0;03h;saturno";
$linha_efem[112]="8;Urano;37;47;Visível;5.9;09h;urano";
$linha_efem[113]="8;Netuno;314;65;Visível;7.9;06h;netuno";
$linha_efem[114]="8;Plutão;255;24;Visível;14.2;03h;plutao";
$linha_efem[115]="8;Siding_Spring;255;24;Visível;14.2;03h;siding_spring";
$linha_efem[116]="8;209P;255;24;Visível;14.2;03h;209p";
$linha_efem[117]="8;R1_Lovejoy;255;24;Visível;14.2;03h;r1_lovejoy";
$linha_efem[118]="9;Sol;47;28;Visível;-;12h;sol";
$linha_efem[119]="9;Lua;358;63;Visível;-8.3;09h;lua";
$linha_efem[120]="9;Mercúrio;52;18;Visível;-1.3;12h;mercurio";
$linha_efem[121]="9;Vênus;32;45;Visível;-3.9;10h;venus";
$linha_efem[122]="9;Marte;63;1;Visível;1.8;14h;marte";
$linha_efem[123]="9;Júpiter;235;-18;Invisível;-2.6;00h;jupiter";
$linha_efem[124]="9;Saturno;250;7;Visível;1.0;03h;saturno";
$linha_efem[125]="9;Urano;16;53;Visível;5.9;09h;urano";
$linha_efem[126]="9;Netuno;295;54;Visível;7.9;06h;netuno";
$linha_efem[127]="9;Plutão;251;10;Visível;14.2;03h;plutao";
$linha_efem[128]="9;Siding_Spring;251;10;Visível;14.2;03h;siding_spring";
$linha_efem[129]="9;209P;251;10;Visível;14.2;03h;209p";
$linha_efem[130]="9;R1_Lovejoy;251;10;Visível;14.2;03h;r1_lovejoy";
$linha_efem[131]="10;Sol;34;37;Visível;-;12h;sol";
$linha_efem[132]="10;Lua;329;59;Visível;-8.3;09h;lua";
$linha_efem[133]="10;Mercúrio;41;28;Visível;-1.3;12h;mercurio";
$linha_efem[134]="10;Vênus;12;50;Visível;-3.9;10h;venus";
$linha_efem[135]="10;Marte;56;13;Visível;1.8;14h;marte";
$linha_efem[136]="10;Júpiter;225;-28;Invisível;-2.6;00h;jupiter";
$linha_efem[137]="10;Saturno;244;-5;Invisível;1.0;03h;saturno";
$linha_efem[138]="10;Urano;351;54;Visível;5.9;09h;urano";
$linha_efem[139]="10;Netuno;284;41;Visível;7.9;06h;netuno";
$linha_efem[140]="10;Plutão;245;-2;Invisível;14.2;03h;plutao";
$linha_efem[141]="10;Siding_Spring;245;-2;Invisível;14.2;03h;siding_spring";
$linha_efem[142]="10;209P;245;-2;Invisível;14.2;03h;209p";
$linha_efem[143]="10;R1_Lovejoy;245;-2;Invisível;14.2;03h;r1_lovejoy";
$linha_efem[144]="11;Sol;18;43;Visível;-;12h;sol";
$linha_efem[145]="11;Lua;309;50;Visível;-8.3;09h;lua";
$linha_efem[146]="11;Mercúrio;28;36;Visível;-1.3;12h;mercurio";
$linha_efem[147]="11;Vênus;350;50;Visível;-3.9;10h;venus";
$linha_efem[148]="11;Marte;47;24;Visível;1.8;14h;marte";
$linha_efem[149]="11;Júpiter;212;-37;Invisível;-2.6;00h;jupiter";
$linha_efem[150]="11;Saturno;236;-17;Invisível;1.0;03h;saturno";
$linha_efem[151]="11;Urano;329;49;Visível;5.9;09h;urano";
$linha_efem[152]="11;Netuno;276;27;Visível;7.9;06h;netuno";
$linha_efem[153]="11;Plutão;238;-15;Invisível;14.2;03h;plutao";
$linha_efem[154]="11;Siding_Spring;238;-15;Invisível;14.2;03h;siding_spring";
$linha_efem[155]="11;209P;238;-15;Invisível;14.2;03h;209p";
$linha_efem[156]="11;R1_Lovejoy;238;-15;Invisível;14.2;03h;r1_lovejoy";
$linha_efem[157]="12;Sol;359;45;Visível;-;12h;sol";
$linha_efem[158]="12;Lua;296;39;Visível;-8.3;09h;lua";
$linha_efem[159]="12;Mercúrio;12;41;Visível;-1.3;12h;mercurio";
$linha_efem[160]="12;Vênus;330;45;Visível;-3.9;10h;venus";
$linha_efem[161]="12;Marte;35;33;Visível;1.8;14h;marte";
$linha_efem[162]="12;Júpiter;196;-42;Invisível;-2.6;00h;jupiter";
$linha_efem[163]="12;Saturno;227;-28;Invisível;1.0;03h;saturno";
$linha_efem[164]="12;Urano;312;40;Visível;5.9;09h;urano";
$linha_efem[165]="12;Netuno;270;13;Visível;7.9;06h;netuno";
$linha_efem[166]="12;Plutão;229;-26;Invisível;14.2;03h;plutao";
$linha_efem[167]="12;Siding_Spring;229;-26;Invisível;14.2;03h;siding_spring";
$linha_efem[168]="12;209P;229;-26;Invisível;14.2;03h;209p";
$linha_efem[169]="12;R1_Lovejoy;229;-26;Invisível;14.2;03h;r1_lovejoy";
$linha_efem[170]="13;Sol;340;42;Visível;-;12h;sol";
$linha_efem[171]="13;Lua;287;26;Visível;-8.3;09h;lua";
$linha_efem[172]="13;Mercúrio;354;42;Visível;-1.3;12h;mercurio";
$linha_efem[173]="13;Vênus;314;37;Visível;-3.9;10h;venus";
$linha_efem[174]="13;Marte;20;39;Visível;1.8;14h;marte";
$linha_efem[175]="13;Júpiter;177;-44;Invisível;-2.6;00h;jupiter";
$linha_efem[176]="13;Saturno;214;-37;Invisível;1.0;03h;saturno";
$linha_efem[177]="13;Urano;301;29;Visível;5.9;09h;urano";
$linha_efem[178]="13;Netuno;264;-0;Invisível;7.9;06h;netuno";
$linha_efem[179]="13;Plutão;217;-35;Invisível;14.2;03h;plutao";
$linha_efem[180]="13;Siding_Spring;217;-35;Invisível;14.2;03h;siding_spring";
$linha_efem[181]="13;209P;217;-35;Invisível;14.2;03h;209p";
$linha_efem[182]="13;R1_Lovejoy;217;-35;Invisível;14.2;03h;r1_lovejoy";
$linha_efem[183]="14;Sol;324;36;Visível;-;12h;sol";
$linha_efem[184]="14;Lua;281;13;Visível;-8.3;09h;lua";
$linha_efem[185]="14;Mercúrio;336;38;Visível;-1.3;12h;mercurio";
$linha_efem[186]="14;Vênus;303;26;Visível;-3.9;10h;venus";
$linha_efem[187]="14;Marte;3;42;Visível;1.8;14h;marte";
$linha_efem[188]="14;Júpiter;158;-41;Invisível;-2.6;00h;jupiter";
$linha_efem[189]="14;Saturno;197;-43;Invisível;1.0;03h;saturno";
$linha_efem[190]="14;Urano;292;17;Visível;5.9;09h;urano";
$linha_efem[191]="14;Netuno;257;-14;Invisível;7.9;06h;netuno";
$linha_efem[192]="14;Plutão;201;-42;Invisível;14.2;03h;plutao";
$linha_efem[193]="14;Siding_Spring;201;-42;Invisível;14.2;03h;siding_spring";
$linha_efem[194]="14;209P;201;-42;Invisível;14.2;03h;209p";
$linha_efem[195]="14;R1_Lovejoy;201;-42;Invisível;14.2;03h;r1_lovejoy";
$linha_efem[196]="15;Sol;312;26;Visível;-;12h;sol";
$linha_efem[197]="15;Lua;275;-0;Invisível;-8.3;09h;lua";
$linha_efem[198]="15;Mercúrio;322;31;Visível;-1.3;12h;mercurio";
$linha_efem[199]="15;Vênus;294;14;Visível;-3.9;10h;venus";
$linha_efem[200]="15;Marte;344;41;Visível;1.8;14h;marte";
$linha_efem[201]="15;Júpiter;143;-34;Invisível;-2.6;00h;jupiter";
$linha_efem[202]="15;Saturno;178;-45;Invisível;1.0;03h;saturno";
$linha_efem[203]="15;Urano;285;4;Visível;5.9;09h;urano";
$linha_efem[204]="15;Netuno;250;-27;Invisível;7.9;06h;netuno";
$linha_efem[205]="15;Plutão;182;-45;Invisível;14.2;03h;plutao";
$linha_efem[206]="15;Siding_Spring;182;-45;Invisível;14.2;03h;siding_spring";
$linha_efem[207]="15;209P;182;-45;Invisível;14.2;03h;209p";
$linha_efem[208]="15;R1_Lovejoy;182;-45;Invisível;14.2;03h;r1_lovejoy";
$linha_efem[209]="16;Sol;302;15;Visível;-;12h;sol";
$linha_efem[210]="16;Lua;269;-13;Invisível;-8.3;09h;lua";
$linha_efem[211]="16;Mercúrio;311;21;Visível;-1.3;12h;mercurio";
$linha_efem[212]="16;Vênus;288;1;Visível;-3.9;10h;venus";
$linha_efem[213]="16;Marte;329;35;Visível;1.8;14h;marte";
$linha_efem[214]="16;Júpiter;131;-25;Invisível;-2.6;00h;jupiter";
$linha_efem[215]="16;Saturno;159;-42;Invisível;1.0;03h;saturno";
$linha_efem[216]="16;Urano;279;-10;Invisível;5.9;09h;urano";
$linha_efem[217]="16;Netuno;240;-40;Invisível;7.9;06h;netuno";
$linha_efem[218]="16;Plutão;163;-43;Invisível;14.2;03h;plutao";
$linha_efem[219]="16;Siding_Spring;163;-43;Invisível;14.2;03h;siding_spring";
$linha_efem[220]="16;209P;163;-43;Invisível;14.2;03h;209p";
$linha_efem[221]="16;R1_Lovejoy;163;-43;Invisível;14.2;03h;r1_lovejoy";
$linha_efem[222]="17;Sol;295;3;Visível;-;12h;sol";
$linha_efem[223]="17;Lua;263;-27;Invisível;-8.3;09h;lua";
$linha_efem[224]="17;Mercúrio;303;10;Visível;-1.3;12h;mercurio";
$linha_efem[225]="17;Vênus;282;-12;Invisível;-3.9;10h;venus";
$linha_efem[226]="17;Marte;316;27;Visível;1.8;14h;marte";
$linha_efem[227]="17;Júpiter;122;-14;Invisível;-2.6;00h;jupiter";
$linha_efem[228]="17;Saturno;143;-35;Invisível;1.0;03h;saturno";
$linha_efem[229]="17;Urano;274;-24;Invisível;5.9;09h;urano";
$linha_efem[230]="17;Netuno;226;-51;Invisível;7.9;06h;netuno";
$linha_efem[231]="17;Plutão;147;-37;Invisível;14.2;03h;plutao";
$linha_efem[232]="17;Siding_Spring;147;-37;Invisível;14.2;03h;siding_spring";
$linha_efem[233]="17;209P;147;-37;Invisível;14.2;03h;209p";
$linha_efem[234]="17;R1_Lovejoy;147;-37;Invisível;14.2;03h;r1_lovejoy";
$linha_efem[235]="18;Sol;290;-10;Invisível;-;12h;sol";
$linha_efem[236]="18;Lua;256;-40;Invisível;-8.3;09h;lua";
$linha_efem[237]="18;Mercúrio;296;-2;Invisível;-1.3;12h;mercurio";
$linha_efem[238]="18;Vênus;277;-26;Invisível;-3.9;10h;venus";
$linha_efem[239]="18;Marte;306;16;Visível;1.8;14h;marte";
$linha_efem[240]="18;Júpiter;115;-2;Invisível;-2.6;00h;jupiter";
$linha_efem[241]="18;Saturno;131;-26;Invisível;1.0;03h;saturno";
$linha_efem[242]="18;Urano;268;-37;Invisível;5.9;09h;urano";
$linha_efem[243]="18;Netuno;203;-59;Invisível;7.9;06h;netuno";
$linha_efem[244]="18;Plutão;134;-28;Invisível;14.2;03h;plutao";
$linha_efem[245]="18;Siding_Spring;134;-28;Invisível;14.2;03h;siding_spring";
$linha_efem[246]="18;209P;134;-28;Invisível;14.2;03h;209p";
$linha_efem[247]="18;R1_Lovejoy;134;-28;Invisível;14.2;03h;r1_lovejoy";
$linha_efem[248]="19;Sol;285;-23;Invisível;-;12h;sol";
$linha_efem[249]="19;Lua;246;-53;Invisível;-8.3;09h;lua";
$linha_efem[250]="19;Mercúrio;291;-14;Invisível;-1.3;12h;mercurio";
$linha_efem[251]="19;Vênus;271;-40;Invisível;-3.9;10h;venus";
$linha_efem[252]="19;Marte;299;5;Visível;1.8;14h;marte";
$linha_efem[253]="19;Júpiter;110;11;Visível;-2.6;00h;jupiter";
$linha_efem[254]="19;Saturno;122;-15;Invisível;1.0;03h;saturno";
$linha_efem[255]="19;Urano;261;-51;Invisível;5.9;09h;urano";
$linha_efem[256]="19;Netuno;174;-61;Invisível;7.9;06h;netuno";
$linha_efem[257]="19;Plutão;124;-17;Invisível;14.2;03h;plutao";
$linha_efem[258]="19;Siding_Spring;124;-17;Invisível;14.2;03h;siding_spring";
$linha_efem[259]="19;209P;124;-17;Invisível;14.2;03h;209p";
$linha_efem[260]="19;R1_Lovejoy;124;-17;Invisível;14.2;03h;r1_lovejoy";
$linha_efem[261]="20;Sol;280;-36;Invisível;-;12h;sol";
$linha_efem[262]="20;Lua;229;-64;Invisível;-8.3;09h;lua";
$linha_efem[263]="20;Mercúrio;287;-27;Invisível;-1.3;12h;mercurio";
$linha_efem[264]="20;Vênus;265;-54;Invisível;-3.9;10h;venus";
$linha_efem[265]="20;Marte;293;-8;Invisível;1.8;14h;marte";
$linha_efem[266]="20;Júpiter;105;24;Visível;-2.6;00h;jupiter";
$linha_efem[267]="20;Saturno;115;-3;Invisível;1.0;03h;saturno";
$linha_efem[268]="20;Urano;249;-64;Invisível;5.9;09h;urano";
$linha_efem[269]="20;Netuno;146;-56;Invisível;7.9;06h;netuno";
$linha_efem[270]="20;Plutão;117;-5;Invisível;14.2;03h;plutao";
$linha_efem[271]="20;Siding_Spring;117;-5;Invisível;14.2;03h;siding_spring";
$linha_efem[272]="20;209P;117;-5;Invisível;14.2;03h;209p";
$linha_efem[273]="20;R1_Lovejoy;117;-5;Invisível;14.2;03h;r1_lovejoy";
$linha_efem[274]="21;Sol;276;-50;Invisível;-;12h;sol";
$linha_efem[275]="21;Lua;195;-72;Invisível;-8.3;09h;lua";
$linha_efem[276]="21;Mercúrio;283;-41;Invisível;-1.3;12h;mercurio";
$linha_efem[277]="21;Vênus;254;-67;Invisível;-3.9;10h;venus";
$linha_efem[278]="21;Marte;288;-21;Invisível;1.8;14h;marte";
$linha_efem[279]="21;Júpiter;101;38;Visível;-2.6;00h;jupiter";
$linha_efem[280]="21;Saturno;109;10;Visível;1.0;03h;saturno";
$linha_efem[281]="21;Urano;220;-76;Invisível;5.9;09h;urano";
$linha_efem[282]="21;Netuno;128;-46;Invisível;7.9;06h;netuno";
$linha_efem[283]="21;Plutão;111;7;Visível;14.2;03h;plutao";
$linha_efem[284]="21;Siding_Spring;111;7;Visível;14.2;03h;siding_spring";
$linha_efem[285]="21;209P;111;7;Visível;14.2;03h;209p";
$linha_efem[286]="21;R1_Lovejoy;111;7;Visível;14.2;03h;r1_lovejoy";
$linha_efem[287]="22;Sol;272;-64;Invisível;-;12h;sol";
$linha_efem[288]="22;Lua;150;-70;Invisível;-8.3;09h;lua";
$linha_efem[289]="22;Mercúrio;280;-54;Invisível;-1.3;12h;mercurio";
$linha_efem[290]="22;Vênus;225;-79;Invisível;-3.9;10h;venus";
$linha_efem[291]="22;Marte;284;-34;Invisível;1.8;14h;marte";
$linha_efem[292]="22;Júpiter;97;51;Visível;-2.6;00h;jupiter";
$linha_efem[293]="22;Saturno;105;23;Visível;1.0;03h;saturno";
$linha_efem[294]="22;Urano;153;-78;Invisível;5.9;09h;urano";
$linha_efem[295]="22;Netuno;115;-35;Invisível;7.9;06h;netuno";
$linha_efem[296]="22;Plutão;106;20;Visível;14.2;03h;plutao";
$linha_efem[297]="22;Siding_Spring;106;20;Visível;14.2;03h;siding_spring";
$linha_efem[298]="22;209P;106;20;Visível;14.2;03h;209p";
$linha_efem[299]="22;R1_Lovejoy;106;20;Visível;14.2;03h;r1_lovejoy";
$linha_efem[300]="23;Sol;264;-77;Invisível;-;12h;sol";
$linha_efem[301]="23;Lua;123;-61;Invisível;-8.3;09h;lua";
$linha_efem[302]="23;Mercúrio;277;-68;Invisível;-1.3;12h;mercurio";
$linha_efem[303]="23;Vênus;137;-80;Invisível;-3.9;10h;venus";
$linha_efem[304]="23;Marte;281;-47;Invisível;1.8;14h;marte";
$linha_efem[305]="23;Júpiter;93;65;Visível;-2.6;00h;jupiter";
$linha_efem[306]="23;Saturno;100;37;Visível;1.0;03h;saturno";
$linha_efem[307]="23;Urano;116;-67;Invisível;5.9;09h;urano";
$linha_efem[308]="23;Netuno;107;-22;Invisível;7.9;06h;netuno";
$linha_efem[309]="23;Plutão;101;34;Visível;14.2;03h;plutao";
$linha_efem[310]="23;Siding_Spring;101;34;Visível;14.2;03h;siding_spring";
$linha_efem[311]="23;209P;101;34;Visível;14.2;03h;209p";
$linha_efem[312]="23;R1_Lovejoy;101;34;Visível;14.2;03h;r1_lovejoy";


function toggle(idx){

var target = document.getElementById(idx); 
 	if (target) with (target.style)
 	{ 
		if (display!= "none")
		 display = "none";
		 else display = "" 
	}

	   var divs = document.getElementsByTagName('DIV');
	   for(var x = 0; x<divs.length;x++){
	   
	   	if (divs[x].id !=idx)
	   	if (divs[x].style.display !="none") // Impede que as DIVs escondidas sejam religadas
	   	{
	   	{
        	  document.getElementById(divs[x].id).style.display="none";      //apaga
                  document.getElementById(divs[x].id).style.display="";          //acende
	        }                   
	        }
           }
}



function muda_hora (sinal){    
    
  if (sinal=="agora"){
     str_hora_seletor="20";  
     plota_objetos(str_hora_seletor);
     num_hora_seletor=parseFloat(str_hora_seletor);
  }

  if (sinal=="+"){                                
     num_hora_seletor=num_hora_seletor+1;
     if (num_hora_seletor > 23){ num_hora_seletor=23; }
     str_hora_seletor=num_hora_seletor.toString();
     plota_objetos(str_hora_seletor);
  }

  if (sinal=="-"){
     num_hora_seletor=num_hora_seletor-1;
     if (num_hora_seletor <0 ){ num_hora_seletor=0; }
     str_hora_seletor=num_hora_seletor.toString();     
     plota_objetos(str_hora_seletor);
  }

}


    
function quadrante(cardeal){
   var carta = document.getElementById("carta"); 
   var quadrante=250;

if (cardeal!="z"){  
   document.getElementById('carta_zenite').style.display="none";                                     // Desliga a carta zenite   
   if (cardeal=="n"){  
   quadrante = 275;
   document.getElementById("paisagem").innerHTML = "<img src='./img/fundo_paisagem_6.jpg'>";   
   }else if (cardeal=="e"){  
   quadrante = -275;
   document.getElementById("paisagem").innerHTML = "<img src='./img/fundo_paisagem_4.jpg'>";   
   }else if (cardeal=="s"){  
   quadrante = -825;
   document.getElementById("paisagem").innerHTML = "<img src='./img/fundo_paisagem_5.jpg'>";   
   }else if (cardeal=="w"){  
   quadrante= -1375;
   document.getElementById("paisagem").innerHTML = "<img src='./img/fundo_paisagem_3.jpg'>";   
   }
   carta.style.left = quadrante;                                                                     // Muda o quadrante
   
   }else{
   
   document.getElementById('carta_zenite').style.display="";                                         // liga a carta zenite
}
  
}

var quando="hoje";
var str_hora_seletor="";
var num_hora_seletor=0;
var efem_split = new Array();                   // Contem as efemérides horárias splitadas
var tot_planetas=13;   // Quantidade de objetos
var tot_linhas_efem=tot_planetas*24;            // Quantidade de linhas nas efemerides
var pix_grau_h=2200/360;                        // Dimensão H do Visor/largura em graus
var pix_grau_v=320/60;                          // Dimensão V do Visor/altura em graus
var modo = "agora";
var count_refresh=0;                            // Contador de refresh


function plota_zenite ($az,$el,$div_id){

// Conversão Polar retangular           

	// Descomente para plotar tudo no centro
	// $az=0;
	// $el=90;
	$pi=3.14159265358979;
	var $degrad=$pi/180;
	var $correcao_posicao_x=-10;
	var $correcao_posicao_y=-10;
	var $altu_carta = 355;
	var $larg_carta = 355;
	var $range=100;                    		// Range do zênite até o solo em graus. Números maiores que 90 plotam abaixo do horizonte	
	$div_id="z_"+$div_id;


	$plot_grau_ver=$altu_carta/200;        		// Relação de pixel por graus: Altura da carta: 110px    range: -100 graus  0  +100 graus  (200 graus)
	$plot_grau_hor=$larg_carta/200;    		// Relação de pixel por graus: Largura da carta: 110px    range: -100 graus  0  +100 graus  (200 graus)
       
        $az_girado=90-$az;
        $el_girado=90-$el;
	$az_rad=$az_girado*$degrad;             	// Transforma o azimute em radiano
	$polar_x = $el_girado*Math.cos($az_rad);
	$polar_y = $el_girado*Math.sin($az_rad);  
	
        $dot_x=($range+$polar_x)*$plot_grau_hor+$correcao_posicao_x;
        $dot_y=($range-$polar_y)*$plot_grau_ver+$correcao_posicao_y;

        var div_planeta = document.getElementById($div_id);
        div_planeta.style.left = $dot_x;
        div_planeta.style.top = $dot_y;
        


return;
}  


function plota_objetos(str_hora_seletor){
   
   var obj_number=0;                                 // Quando entrar no loop, incrementa 1 para cada objeto lido
   var div_status;                                   // Nome da div que será preenchida com as efemérides: efem_1,efem_2, etc
   var cor_status="FFDD00";

   num_hora_seletor=parseFloat(str_hora_seletor);

   for (loop=1; loop<=tot_linhas_efem; loop++){  
   
        efem_split=$linha_efem[loop].split(";");

        if (quando=="hoje"){
        document.getElementById("status_bar").innerHTML = "Hoje 30-05-2019 - "  + str_hora_seletor + " horas";     
        }else{
        document.getElementById("status_bar").innerHTML = "Data selecionada: 30-05-2019 - "  + str_hora_seletor + " horas";             
        }
       
        if (efem_split[0]==str_hora_seletor){        // Separa os do horário escolhido
        
           obj_number++;                // número do objeto
           div_status="efem_" + obj_number.toString();
           
           var ob=efem_split[1];        // Objeto      
           var az=efem_split[2];        // Azimute      
           var el=efem_split[3];        // Elevação
           var st=efem_split[4];        // Status                 
           var mag=efem_split[5];       // Magnitude
           var ap=efem_split[6];        // Apice
           var div_id=efem_split[7];    // div_id

           plota_zenite(az,el,div_id);

           
	   //az=45;   // Simulação
	   //el=30;   // Simulação           
          
	   if (az >315){  
	     az=az-360;                                            // plota az>315 no lado norte ao invés do oeste (O visor mostra de -45(315) até 315)
	   }
	   
	   if (efem_split[4] =="Visível"){
	    cor_status="28C903";
	    efem_split[4]="Acima";	    
	     }else{ 
	    cor_status="FFDD00";
	    efem_split[4]="Abaixo";	    	    
	   }
           
	    
           var posic_h=az*pix_grau_h;
           var posic_v=el*pix_grau_v-10;                          // Insere correção na vertical     

           var div_planeta = document.getElementById(div_id);     // Localiza a DIV correspondente e...
           div_planeta.style.left = posic_h;                      // Plota h
           div_planeta.style.bottom = posic_v;                    // Plota v

           if (div_id != "plutao"){
           document.getElementById(div_status).innerHTML = "<table cellpadding=0 cellspacing=0 id=tab_efem  ><td width=25%>"+efem_split[1]+"</td><td width=13%>"+efem_split[2]+"</td><td width=13%>"+efem_split[3]+"</td><td width=21%><font color="+cor_status+">"+efem_split[4]+"</font></td><td width=15%>"+efem_split[5]+"</td><td width=13%>"+efem_split[6]+"</td></table>";              
           }
        
	}   
   }                                       
}   



function plota_agora(){

   var div_status;                                   // Nome da div que será preenchida com as efemérides: efem_1,efem_2, etc
   var tot_planetas="13";
   
   num_hora_seletor=parseFloat("20");

   for (loop=1; loop<=tot_planetas; loop++){  
   
     div_status="efem_" + loop.toString();   
     
     now_split=$linha_now[loop].split(";");

           var ob=now_split[1];        // Objeto      
           var az=now_split[2];        // Azimute      
           var el=now_split[3];        // Elevação
           var st=now_split[4];        // Status                 
           var mag=now_split[5];       // Magnitude
           var ap=now_split[6];        // Apice
           var div_id=now_split[7];    // div_id
           
           plota_zenite(az,el,div_id);
           
	   //az=45;   // Simulação
	   //el=30;   // Simulação           
          
	   if (az >315){  
	     az=az-360;                 // plota az>315 no lado norte ao invés do oeste (O visor mostra de -45(315) até 315)
	   }

	   if (now_split[4] =="Visível"){
	    cor_status="28C903";
	    now_split[4]="Acima";
	     }else{ 
	    cor_status="FFDD00";
	    now_split[4]="Abaixo";	    
	   }

           var posic_h=az*pix_grau_h;
           var posic_v=el*pix_grau_v-10;      // Insere correção na vertical     
           
           var div_planeta = document.getElementById(div_id);
           div_planeta.style.left = posic_h;
           div_planeta.style.bottom = posic_v;    
           
           
           //==============================================
           // Correção de Magnitude para o Cometa Elenin
           if (div_id == "elenin"){
            now_split[5]= 5 + parseFloat(now_split[5]);
           }
           //==============================================
                      

           if (div_id != "plutao"){
            document.getElementById(div_status).innerHTML = "<table cellpadding=0 cellspacing=0 id=tab_efem  ><td width=25%>"+now_split[1]+"</td><td width=13%>"+now_split[2]+"</td><td width=13%>"+now_split[3]+"</td><td width=21%><font color="+cor_status+">"+now_split[4]+"</font></td><td width=15%>"+now_split[5]+"</td><td width=13%>"+now_split[6]+"</td></table>";                                
           }
           
   }                                       
} 