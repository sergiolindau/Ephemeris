/***********************************************************************
 JavaScript static class fastiCircuitum
 
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

/* Dependecy: The file "DateTime.js" must be included before this file */
class fastiCircuitum {
// Return first year of solar cycle. First cycle is 0 at 9 BCE.
	static solisCycle(cycle) {
		return (cycle*28-8);
	}

// Return index of year in Solar Cycle
	static solisCircuitum(year) {
		return (year + 8) % 28;
	}

//Note: first year of 73th (72) cycle is 2008 (index 0). This cycle ends in year 2035

// Returns true if is the next year after leap year
	static saltuSolisCircuitum(year) {
		return Math.abs(year%4)==1;
	}

// Return index of year in Solar Cycle with "*" appended if saltu.
	static solisCircuitumIndex(year) {
		var s = fastiCircuitum.solisCircuitum(year);
		return s + (fastiCircuitum.saltuSolisCircuitum(year)?"*":"");
	}

// Return dominical letter index from day of week argument. (returns A=0, G=1, F=2, E=3, D=4, C=5, B=6;
	static dominical(d) {
		d = 7 - (d % 7);
		return d<7?d:0;
	}

// Return dominical letter from index argument.
	static dominicalLetter(d) {
		return String.fromCharCode(65+fastiCircuitum.dominical(d));
	}

// Return dominical letter cycle index from year argument.
	static solisDominical(year) {
		return (year - 16) % 28;
	}

// Return dominical letter index from year argument.
	static dominicalComputus( year ) {
		var s = fastiCircuitum.solisDominical( year + 11 );
		return ( (s + 5 + Math.trunc( (s)/4 )) % 7 );
	}

// Return dominical letter from year argument.
	static yearDominicalComputus( year ) {
		var s = fastiCircuitum.dominicalComputus(year);
		return fastiCircuitum.dominicalLetter(s) + (DateTime.isLeap(year)?fastiCircuitum.dominicalLetter(s+1):"")
	}

// Carnival
	festum = -47;
// Chorpus Christi
	corpusDomini = 60;
// Easter Sunday
	static dominicaPaschae(year){
		var trunc = Math.trunc, n, c, u, s, t, p, q, e, b, L, h;
		n = year % 19;                             // ciclo Metônico
		c = trunc(year / 100);                     // número de séculos completados
		u = year % 100;                            // anos passados além de séculos completos
		s = trunc(c / 4);                          // número de ciclos gregorianos de séculos bissextos completados (ciclos de 400 anos, 97 anos bissextos)
		t = c % 4;                                 // séculos além dos ciclos de bissextos completos
		p = trunc((c + 8) / 25);                   // ciclos de proemptose completados
		q = trunc((c - p + 1) / 3);                // proemptose passadas além dos ciclos completos
		e = (19 * n + c - s - q + 15) % 30;        // epacta
		b = trunc(u / 4);                          // numero de ciclos julianos de anos bissextos completados
		d = u % 4;                                 // anos além dos ciclos julianos de anos bissextos completos
		L = (32 + 2 * t + 2 * b - e - d) % 7;      // letra dominical
		h = trunc((n + 11 * e + 22 * L) / 451);    // correção
		m = trunc((e + L - 7 * h + 114) / 31) - 1; //
		j = 1 + (e + L - 7 * h + 114) % 31;        // 
		return {month:m, date:j};
	}

}

function printDominicalTable(){
	var dominical_tab = "<h1 align=\"center\">Dominical Letter Tables</h1>"+
	"<table width=\"0%\" border=\"1\">"+
		"<tr>"+
		"<th></th>"+
			"<th><br />"+
            "1700"+
            "<p>2100</p></th>"+
          "<th></th>"+
          "<th>1800"+
            "<p>2200</p></th>"+
          "<th></th>"+
          "<th>1500"+
            "<p>1900</p>"+
            "<p>2300</p></th>"+
          "<th>1600"+
            "<p>2000</p>"+
            "<p>2400</p></th>"+
          "<th></th>"+
          "<th rowspan=\"2\">years in century –"+
            "<p>Gregorian Calendar</p></th>"+
        "</tr>"+
        "<tr>"+
          "<td>00</td>"+
          "<td>C</td>"+
          "<td></td>"+
          "<td>E</td>"+
          "<td></td>"+
          "<td>G</td>"+
          "<td>BA</td>"+
          "<td></td>"+
        "</tr>"+
        "<tr>"+
          "<td>01 29 57 85"+
            "<p>02 30 57 86</p>"+
            "<p>03 31 59 87</p>"+
            "<p>04 32 60 88</p></td>"+
          "<td>B"+
            "<p>A</p>"+
            "<p>G</p>"+
            "<p>FE</p></td>"+
          "<td>C"+
            "<p>B</p>"+
            "<p>A</p>"+
            "<p>GF</p></td>"+
          "<td>D"+
            "<p>C</p>"+
            "<p>B</p>"+
            "<p>AG</p></td>"+
          "<td>E"+
            "<p>D</p>"+
            "<p>C</p>"+
            "<p>BA</p></td>"+
          "<td>F"+
            "<p>E</p>"+
            "<p>D</p>"+
            "<p>CB</p></td>"+
          "<td>G"+
            "<p>F</p>"+
            "<p>E</p>"+
            "<p>DC</p></td>"+
          "<td>A"+
            "<p>G</p>"+
            "<p>F</p>"+
            "<p>ED</p></td>"+
          "<td rowspan=\"7\"></td>"+
        "</tr>"+
        "<tr>"+
          "<td>05 33 61 89"+
            "<p>06 34 62 90</p>"+
            "<p>07 35 63 91</p>"+
            "<p>08 36 64 92</p></td>"+
          "<td>D"+
            "<p>C</p>"+
            "<p>B</p>"+
            "<p>AG</p></td>"+
          "<td>E"+
            "<p>D</p>"+
            "<p>C</p>"+
            "<p>BA</p></td>"+
          "<td>F"+
            "<p>E</p>"+
            "<p>D</p>"+
            "<p>CB</p></td>"+
          "<td>G"+
            "<p>F</p>"+
            "<p>E</p>"+
            "<p>DC</p></td>"+
          "<td>A"+
            "<p>G</p>"+
            "<p>F</p>"+
            "<p>ED</p></td>"+
          "<td>B"+
            "<p>A</p>"+
            "<p>G</p>"+
            "<p>FE</p></td>"+
          "<td>C"+
            "<p>B</p>"+
            "<p>A</p>"+
            "<p>GF</p></td>"+
        "</tr>"+
        "<tr>"+
          "<td>09 37 65 93"+
            "<p>10 38 66 94</p>"+
            "<p>11 39 67 95</p>"+
            "<p>12 40 68 96</p></td>"+
          "<td>F"+
            "<p>E</p>"+
            "<p>D</p>"+
            "<p>CB</p></td>"+
          "<td>G"+
            "<p>F</p>"+
            "<p>E</p>"+
            "<p>DC</p></td>"+
          "<td>A"+
            "<p>G</p>"+
            "<p>F</p>"+
            "<p>ED</p></td>"+
          "<td>B"+
            "<p>A</p>"+
            "<p>G</p>"+
            "<p>FE</p></td>"+
          "<td>C"+
            "<p>B</p>"+
            "<p>A</p>"+
            "<p>GF</p></td>"+
          "<td>D"+
            "<p>C</p>"+
            "<p>B</p>"+
            "<p>AG</p></td>"+
          "<td>E"+
            "<p>D</p>"+
            "<p>C</p>"+
            "<p>BA</p></td>"+
        "</tr>"+
        "<tr>"+
          "<td>13 41 69 97"+
            "<p>14 42 70 98</p>"+
            "<p>15 43 71 99</p>"+
            "<p>16 44 72</p></td>"+
          "<td>A"+
            "<p>G</p>"+
            "<p>F</p>"+
            "<p>ED</p></td>"+
          "<td>B"+
            "<p>A</p>"+
            "<p>G</p>"+
            "<p>FE</p></td>"+
          "<td>C"+
            "<p>B</p>"+
            "<p>A</p>"+
            "<p>GF</p></td>"+
          "<td>D"+
            "<p>C</p>"+
            "<p>B</p>"+
            "<p>AG</p></td>"+
          "<td>E"+
            "<p>D</p>"+
            "<p>C</p>"+
            "<p>BA</p></td>"+
          "<td>F"+
            "<p>E</p>"+
            "<p>D</p>"+
            "<p>CB</p></td>"+
          "<td>G"+
            "<p>F</p>"+
            "<p>E</p>"+
            "<p>DC</p></td>"+
        "</tr>"+
        "<tr>"+
          "<td>17 45 73"+
            "<p>18 46 74</p>"+
            "<p>19 47 75</p>"+
            "<p>20 48 76</p></td>"+
          "<td>C"+
            "<p>B</p>"+
            "<p>A</p>"+
            "<p>GF</p></td>"+
          "<td>D"+
            "<p>C</p>"+
            "<p>B</p>"+
            "<p>AG</p></td>"+
          "<td>E"+
            "<p>D</p>"+
            "<p>C</p>"+
            "<p>BA</p></td>"+
          "<td>F"+
            "<p>E</p>"+
            "<p>D</p>"+
            "<p>CB</p></td>"+
          "<td>G"+
            "<p>F</p>"+
            "<p>E</p>"+
            "<p>DC</p></td>"+
          "<td>A"+
            "<p>G</p>"+
            "<p>F</p>"+
            "<p>ED</p></td>"+
          "<td>B"+
            "<p>A</p>"+
            "<p>G</p>"+
            "<p>FE</p></td>"+
        "</tr>"+
        "<tr>"+
          "<td>21 49 77"+
            "<p>22 50 78</p>"+
            "<p>23 51 79</p>"+
            "<p>24 52 80</p></td>"+
          "<td>E"+
            "<p>D</p>"+
            "<p>C</p>"+
            "<p>BA</p></td>"+
          "<td>F"+
            "<p>E</p>"+
            "<p>D</p>"+
            "<p>CB</p></td>"+
          "<td>G"+
            "<p>F</p>"+
            "<p>E</p>"+
            "<p>DC</p></td>"+
          "<td>A"+
            "<p>G</p>"+
            "<p>F</p>"+
            "<p>ED</p></td>"+
          "<td>B"+
            "<p>A</p>"+
            "<p>G</p>"+
            "<p>FE</p></td>"+
          "<td>C"+
            "<p>B</p>"+
            "<p>A</p>"+
            "<p>GF</p></td>"+
          "<td>D"+
            "<p>C</p>"+
            "<p>B</p>"+
            "<p>AG</p></td>"+
        "</tr>"+
        "<tr>"+
          "<td>25 53 81"+
            "<p>26 54 62</p>"+
            "<p>27 55 83</p>"+
            "<p>28 56 84</p></td>"+
          "<td>G"+
            "<p>F</p>"+
            "<p>E</p>"+
            "<p>DC</p></td>"+
          "<td>A"+
            "<p>G</p>"+
            "<p>F</p>"+
            "<p>ED</p></td>"+
          "<td>B"+
            "<p>A</p>"+
            "<p>G</p>"+
            "<p>FE</p></td>"+
          "<td>C"+
            "<p>B</p>"+
            "<p>A</p>"+
            "<p>GF</p></td>"+
          "<td>D"+
            "<p>C</p>"+
            "<p>B</p>"+
            "<p>AG</p></td>"+
          "<td>E"+
            "<p>D</p>"+
            "<p>C</p>"+
            "<p>BA</p></td>"+
          "<td>F"+
            "<p>E</p>"+
            "<p>D</p>"+
            "<p>CB</p></td>"+
        "</tr>"+
        "<tr>"+
          "<td>00</td>"+
          "<td>DC</td>"+
          "<td>ED</td>"+
          "<td>FE</td>"+
          "<td>GF</td>"+
          "<td>AG</td>"+
          "<td>BA</td>"+
          "<td>CB</td>"+
          "<th rowspan=\"2\">years in century –"+
            "<p>Julian Calendar</p></th>"+
        "</tr>"+
        "<tr>"+
          "<th></th>"+
          "<th>0"+
            "<p>700</p>"+
            "<p>1400</p></th>"+
          "<th>100"+
            "<p>800</p>"+
            "<p>1500</p></th>"+
          "<th>200"+
            "<p>900</p>"+
            "<p>1600</p></th>"+
          "<th>300"+
            "<p>1000</p>"+
            "<p>1700</p></th>"+
          "<th>400"+
            "<p>1100</p>"+
            "<p>1800</p></th>"+
          "<th>500"+
            "<p>1200</p>"+
            "<p>1900</p></th>"+
          "<th>600"+
            "<p>1300</p>"+
            "<p>2000</p></th>"+
        "</tr>"+
    "</table>"+
	"";
	document.write(dominical_tab);
}

function printSolarCycleTable(){
		document.writeln("<br /><h2>Solar Cycle Table</h2>");
		var i_solisCycle = 72;
		document.writeln("<table width=\"0%\" border=\"1\">");
		document.writeln("<tr><td>Year</td>");
		for (var i=fastiCircuitum.solisCycle(i_solisCycle);i<fastiCircuitum.solisCycle(i_solisCycle+1);i++){
			document.writeln("<td>" + i + "</td>");
		}
		document.writeln("</tr><tr><td>(solisCircuitum)</td>");
		for (var i=fastiCircuitum.solisCycle(i_solisCycle);i<fastiCircuitum.solisCycle(i_solisCycle+1);i++){
			document.writeln("<td>" + fastiCircuitum.solisCircuitum(i) + "</td>");
		}
		document.writeln("</tr><tr><td><a href=\"https://fr.wikipedia.org/wiki/Cycle_solaire_calendaire\">Solar Cycle</a> " + (i_solisCycle+1) + ":0 (" + fastiCircuitum.solisCycle(i_solisCycle) + ") (solisCircuitumIndex)</td>");
		for (var i=fastiCircuitum.solisCycle(i_solisCycle);i<fastiCircuitum.solisCycle(i_solisCycle+1);i++){
			document.writeln("<td>" + fastiCircuitum.solisCircuitumIndex(i) + "</td>");
		}
		document.writeln("</tr><tr><td>(solisDominical)</td>");
		for (var i=fastiCircuitum.solisCycle(i_solisCycle);i<fastiCircuitum.solisCycle(i_solisCycle+1);i++){
			document.writeln("<td>" + fastiCircuitum.solisDominical(i) + "</td>");
		}
		document.writeln("</tr><tr><td>(dominicalComputus)</td>");
		for (var i=fastiCircuitum.solisCycle(i_solisCycle);i<fastiCircuitum.solisCycle(i_solisCycle+1);i++){
			document.writeln("<td>" + fastiCircuitum.dominicalComputus(i) + "</td>");
		}
		document.writeln("</tr><tr><td><a href=\"https://de.wikipedia.org/wiki/Sonntagsbuchstabe#Sonntagsbuchstaben_im_julianischen_und_im_gregorianischen_Kalender\">Dominical Letter</a> (yearDominicalComputus)</td>");
		for (var i=fastiCircuitum.solisCycle(i_solisCycle);i<fastiCircuitum.solisCycle(i_solisCycle+1);i++){
			document.writeln("<td>" + fastiCircuitum.yearDominicalComputus(i) + "</td>");
		}
		document.writeln("</tr><tr><td>Dominical Letter (check)</td>");
		const checkDominical = ["FE","D","C","B","AG","F","E","D","CB","A","G","F","ED","C","B","A","GF","E","D","C","BA","G","F","E","DC","B","A","G"];
		for (var i=0;i<checkDominical.length;i++){
			document.writeln("<td>"+checkDominical[i]+"</td>");
		}
		document.writeln("</tr></table>");
}
