// star_catalog.js  -  Don Cross  -  http://cosinekitty.com/
var StarCatalog = [
  {'name':'Alp And', 'ra':0.139805555555556, 'dec':29.0905555555556, 'mag':2.06} 
, {'name':'Bet Cas', 'ra':0.152972222222222, 'dec':59.1497222222222, 'mag':2.27} 
, {'name':'Eps Phe', 'ra':0.156861111111111, 'dec':-45.7475, 'mag':3.88} 
, {'name':'Gam Peg', 'ra':0.220611111111111, 'dec':15.1836111111111, 'mag':2.83} 
, {'name':'Iot Cet', 'ra':0.323805555555556, 'dec':-8.82388888888889, 'mag':3.56} 
, {'name':'Bet Hyi', 'ra':0.429194444444445, 'dec':-77.2541666666667, 'mag':2.8} 
, {'name':'Alp Phe', 'ra':0.438055555555556, 'dec':-42.3061111111111, 'mag':2.39} 
, {'name':'Kap Phe', 'ra':0.436722222222222, 'dec':-43.68, 'mag':3.94} 
, {'name':'Zet Cas', 'ra':0.616194444444444, 'dec':53.8969444444444, 'mag':3.66} 
, {'name':'Del And', 'ra':0.655472222222222, 'dec':30.8608333333333, 'mag':3.27} 
, {'name':'Alp Cas', 'ra':0.675138888888889, 'dec':56.5372222222222, 'mag':2.23} 
, {'name':'Bet Cet', 'ra':0.7265, 'dec':-17.9866666666667, 'mag':2.04} 
, {'name':'Eta Cas', 'ra':0.818333333333333, 'dec':57.8158333333333, 'mag':3.44} 
, {'name':'Gam Cas', 'ra':0.945138888888889, 'dec':60.7166666666667, 'mag':2.47} 
, {'name':'Mu  And', 'ra':0.945888888888889, 'dec':38.4994444444444, 'mag':3.87} 
, {'name':'Bet Phe', 'ra':1.10138888888889, 'dec':-46.7186111111111, 'mag':3.31} 
, {'name':'Eta Cet', 'ra':1.14316666666667, 'dec':-10.1822222222222, 'mag':3.45} 
, {'name':'Bet And', 'ra':1.16219444444444, 'dec':35.6205555555556, 'mag':2.06} 
, {'name':'Zet Phe', 'ra':1.13975, 'dec':-55.2458333333333, 'mag':3.92} 
, {'name':'The Cet', 'ra':1.40038888888889, 'dec':-8.18333333333333, 'mag':3.6} 
, {'name':'Del Cas', 'ra':1.43027777777778, 'dec':60.2352777777778, 'mag':2.68} 
, {'name':'Polaris', 'ra':2.53019444444444, 'dec':89.2641666666667, 'mag':2.02} 
, {'name':'Gam Phe', 'ra':1.47275, 'dec':-43.3183333333333, 'mag':3.41} 
, {'name':'Eta Psc', 'ra':1.52472222222222, 'dec':15.3458333333333, 'mag':3.62} 
, {'name':'Del Phe', 'ra':1.52086111111111, 'dec':-49.0727777777778, 'mag':3.95} 
, {'name':'And', 'ra':1.63322222222222, 'dec':48.6283333333333, 'mag':3.57} 
, {'name':'Archernar', 'ra':1.62858333333333, 'dec':-57.2366666666667, 'mag':0.46} 
, {'name':'Tau Cet', 'ra':1.73447222222222, 'dec':-15.9375, 'mag':3.5} 
, {'name':'Zet Cet', 'ra':1.85766666666667, 'dec':-10.335, 'mag':3.73} 
, {'name':'Eps Cas', 'ra':1.90658333333333, 'dec':63.67, 'mag':3.38} 
, {'name':'Alp Tri', 'ra':1.88469444444444, 'dec':29.5788888888889, 'mag':3.41} 
, {'name':'Bet Ari', 'ra':1.91066666666667, 'dec':20.8080555555556, 'mag':2.64} 
, {'name':'Chi Eri', 'ra':1.93263888888889, 'dec':-51.6088888888889, 'mag':3.7} 
, {'name':'Cas', 'ra':2.05725, 'dec':72.4213888888889, 'mag':3.98} 
, {'name':'Ups Cet', 'ra':2.00008333333333, 'dec':-21.0777777777778, 'mag':4} 
, {'name':'Alp Hyi', 'ra':1.9795, 'dec':-61.5697222222222, 'mag':2.86} 
, {'name':'Gam1And', 'ra':2.065, 'dec':42.3297222222222, 'mag':2.26} 
, {'name':'Alp Ari', 'ra':2.11955555555556, 'dec':23.4625, 'mag':2} 
, {'name':'Bet Tri', 'ra':2.15905555555556, 'dec':34.9872222222222, 'mag':3} 
, {'name':'Phi Eri', 'ra':2.27516666666667, 'dec':-51.5122222222222, 'mag':3.56} 
, {'name':'Omi Cet', 'ra':2.32241666666667, 'dec':-2.9775, 'mag':3.04} 
, {'name':'Gam Cet', 'ra':2.72166666666667, 'dec':3.23583333333333, 'mag':3.47} 
, {'name':'Eta Per', 'ra':2.84494444444444, 'dec':55.8955555555556, 'mag':3.76} 
, {'name':'Ari', 'ra':2.83305555555556, 'dec':27.2605555555556, 'mag':3.63} 
, {'name':'Tau Per', 'ra':2.90430555555556, 'dec':52.7625, 'mag':3.95} 
, {'name':'Eta Eri', 'ra':2.94047222222222, 'dec':-8.89805555555555, 'mag':3.89} 
, {'name':'The1Eri', 'ra':2.97102777777778, 'dec':-40.3047222222222, 'mag':3.24} 
, {'name':'Alp Cet', 'ra':3.038, 'dec':4.08972222222222, 'mag':2.53} 
, {'name':'Gam Per', 'ra':3.07994444444444, 'dec':53.5063888888889, 'mag':2.93} 
, {'name':'Rho Per', 'ra':3.08627777777778, 'dec':38.8402777777778, 'mag':3.39} 
, {'name':'Algol', 'ra':3.13613888888889, 'dec':40.9555555555556, 'mag':2.12} 
, {'name':'Kap Per', 'ra':3.15827777777778, 'dec':44.8572222222222, 'mag':3.8} 
, {'name':'Alp For', 'ra':3.20119444444444, 'dec':-28.9869444444444, 'mag':3.87} 
, {'name':'Tau4Eri', 'ra':3.32527777777778, 'dec':-21.7577777777778, 'mag':3.69} 
, {'name':'Mirfak', 'ra':3.40538888888889, 'dec':49.8611111111111, 'mag':1.79} 
, {'name':'Omi Tau', 'ra':3.41355555555556, 'dec':9.02888888888889, 'mag':3.6} 
, {'name':'Xi  Tau', 'ra':3.45283333333333, 'dec':9.73277777777778, 'mag':3.74} 
, {'name':'Eps Eri', 'ra':3.54883333333333, 'dec':-9.45833333333333, 'mag':3.73} 
, {'name':'Del Per', 'ra':3.71541666666667, 'dec':47.7875, 'mag':3.01} 
, {'name':'Omi Per', 'ra':3.73863888888889, 'dec':32.2883333333333, 'mag':3.83} 
, {'name':'Nu  Per', 'ra':3.75322222222222, 'dec':42.5786111111111, 'mag':3.77} 
, {'name':'Del Eri', 'ra':3.72080555555556, 'dec':-9.76333333333333, 'mag':3.54} 
, {'name':'Tau', 'ra':3.74791666666667, 'dec':24.1133333333333, 'mag':3.7} 
, {'name':'Tau', 'ra':3.76377777777778, 'dec':24.3677777777778, 'mag':3.87} 
, {'name':'Eta Tau', 'ra':3.79141666666667, 'dec':24.105, 'mag':2.87} 
, {'name':'Bet Ret', 'ra':3.73666666666667, 'dec':-64.8069444444444, 'mag':3.85} 
, {'name':'Tau', 'ra':3.81936111111111, 'dec':24.0533333333333, 'mag':3.63} 
, {'name':'Zet Per', 'ra':3.90219444444444, 'dec':31.8836111111111, 'mag':2.85} 
, {'name':'Gam Hyi', 'ra':3.78730555555556, 'dec':-74.2388888888889, 'mag':3.24} 
, {'name':'Eps Per', 'ra':3.96422222222222, 'dec':40.0102777777778, 'mag':2.89} 
, {'name':'Gam Eri', 'ra':3.96716666666667, 'dec':-13.5086111111111, 'mag':2.95} 
, {'name':'Lam Tau', 'ra':4.01133333333333, 'dec':12.4902777777778, 'mag':3.47} 
, {'name':'Nu  Tau', 'ra':4.05261111111111, 'dec':5.98916666666667, 'mag':3.91} 
, {'name':'Alp Hor', 'ra':4.23336111111111, 'dec':-42.2944444444444, 'mag':3.86} 
, {'name':'Alp Ret', 'ra':4.24041666666667, 'dec':-62.4738888888889, 'mag':3.35} 
, {'name':'Gam Tau', 'ra':4.32988888888889, 'dec':15.6275, 'mag':3.65} 
, {'name':'Ups4Eri', 'ra':4.29825, 'dec':-33.7983333333333, 'mag':3.56} 
, {'name':'Del1Tau', 'ra':4.38225, 'dec':17.5425, 'mag':3.76} 
, {'name':'Eri', 'ra':4.40061111111111, 'dec':-34.0169444444444, 'mag':3.96} 
, {'name':'Eps Tau', 'ra':4.47694444444444, 'dec':19.1802777777778, 'mag':3.53} 
, {'name':'The1Tau', 'ra':4.47625, 'dec':15.9622222222222, 'mag':3.84} 
, {'name':'The2Tau', 'ra':4.47769444444444, 'dec':15.8708333333333, 'mag':3.4} 
, {'name':'Aldeberan', 'ra':4.59866666666667, 'dec':16.5091666666667, 'mag':0.85} 
, {'name':'Nu  Eri', 'ra':4.60530555555555, 'dec':-3.3525, 'mag':3.93} 
, {'name':'Ups2Eri', 'ra':4.5925, 'dec':-30.5622222222222, 'mag':3.82} 
, {'name':'Alp Dor', 'ra':4.56661111111111, 'dec':-55.045, 'mag':3.27} 
, {'name':'Eri', 'ra':4.63633333333333, 'dec':-14.3038888888889, 'mag':3.87} 
, {'name':'Pi 3Ori', 'ra':4.83066666666667, 'dec':6.96138888888889, 'mag':3.19} 
, {'name':'Pi 4Ori', 'ra':4.85344444444444, 'dec':5.605, 'mag':3.69} 
, {'name':'Pi 5Ori', 'ra':4.90419444444445, 'dec':2.44055555555556, 'mag':3.72} 
, {'name':'Iot Aur', 'ra':4.94988888888889, 'dec':33.1661111111111, 'mag':2.69} 
, {'name':'Eps Aur', 'ra':5.03280555555556, 'dec':43.8233333333333, 'mag':2.99} 
, {'name':'Zet Aur', 'ra':5.04130555555556, 'dec':41.0758333333333, 'mag':3.75} 
, {'name':'Eta Aur', 'ra':5.10858333333333, 'dec':41.2344444444444, 'mag':3.17} 
, {'name':'Eps Lep', 'ra':5.09102777777778, 'dec':-22.3711111111111, 'mag':3.19} 
, {'name':'Bet Eri', 'ra':5.13083333333333, 'dec':-5.08638888888889, 'mag':2.79} 
, {'name':'Mu  Lep', 'ra':5.21552777777778, 'dec':-16.2055555555556, 'mag':3.31} 
, {'name':'Capella', 'ra':5.27816666666667, 'dec':45.9980555555556, 'mag':0.08} 
, {'name':'Rigel', 'ra':5.24230555555556, 'dec':-8.20166666666667, 'mag':0.12} 
, {'name':'Tau Ori', 'ra':5.29344444444444, 'dec':-6.84444444444444, 'mag':3.6} 
, {'name':'Eta Ori', 'ra':5.40794444444444, 'dec':-2.39694444444444, 'mag':3.36} 
, {'name':'Bellatrix', 'ra':5.41886111111111, 'dec':6.34972222222222, 'mag':1.64} 
, {'name':'Elnath', 'ra':5.43819444444445, 'dec':28.6075, 'mag':1.65} 
, {'name':'Bet Lep', 'ra':5.47075, 'dec':-20.7594444444444, 'mag':2.84} 
, {'name':'Mintaka', 'ra':5.53344444444444, 'dec':-0.299166666666667, 'mag':2.23} 
, {'name':'Eps Col', 'ra':5.52019444444444, 'dec':-35.4705555555556, 'mag':3.87} 
, {'name':'Alp Lep', 'ra':5.5455, 'dec':-17.8222222222222, 'mag':2.58} 
, {'name':'Lam Ori', 'ra':5.58563888888889, 'dec':9.93416666666667, 'mag':3.54} 
, {'name':'Iot Ori', 'ra':5.59055555555556, 'dec':-5.91, 'mag':2.77} 
, {'name':'Alnilam', 'ra':5.60355555555556, 'dec':-1.20194444444444, 'mag':1.7} 
, {'name':'Zet Tau', 'ra':5.62741666666667, 'dec':21.1425, 'mag':3} 
, {'name':'Bet Dor', 'ra':5.56041666666667, 'dec':-62.4897222222222, 'mag':3.76} 
, {'name':'Sig Ori', 'ra':5.64577777777778, 'dec':-2.6, 'mag':3.81} 
, {'name':'Alnitak', 'ra':5.67930555555556, 'dec':-1.94277777777778, 'mag':2.05} 
, {'name':'Alp Col', 'ra':5.66080555555556, 'dec':-34.0741666666667, 'mag':2.64} 
, {'name':'Gam Lep', 'ra':5.74105555555556, 'dec':-22.4483333333333, 'mag':3.6} 
, {'name':'Zet Lep', 'ra':5.78258333333333, 'dec':-14.8219444444444, 'mag':3.55} 
, {'name':'Saiph', 'ra':5.79594444444444, 'dec':-9.66972222222222, 'mag':2.06} 
, {'name':'Nu  Aur', 'ra':5.85816666666667, 'dec':39.1486111111111, 'mag':3.97} 
, {'name':'Bet Pic', 'ra':5.78808333333333, 'dec':-51.0663888888889, 'mag':3.85} 
, {'name':'Del Lep', 'ra':5.85536111111111, 'dec':-20.8791666666667, 'mag':3.81} 
, {'name':'Bet Col', 'ra':5.84933333333333, 'dec':-35.7683333333333, 'mag':3.12} 
, {'name':'Betelgeuse', 'ra':5.91952777777778, 'dec':7.40694444444445, 'mag':0.5} 
, {'name':'Del Aur', 'ra':5.99211111111111, 'dec':54.2847222222222, 'mag':3.72} 
, {'name':'Eta Lep', 'ra':5.94008333333333, 'dec':-14.1677777777778, 'mag':3.71} 
, {'name':'Bet Aur', 'ra':5.99213888888889, 'dec':44.9475, 'mag':1.9} 
, {'name':'The Aur', 'ra':5.99536111111111, 'dec':37.2125, 'mag':2.62} 
, {'name':'Eta Col', 'ra':5.98577777777778, 'dec':-42.8152777777778, 'mag':3.96} 
, {'name':'Eta Gem', 'ra':6.24794444444444, 'dec':22.5066666666667, 'mag':3.28} 
, {'name':'Gam Mon', 'ra':6.24758333333333, 'dec':-6.27472222222222, 'mag':3.98} 
, {'name':'Zet CMa', 'ra':6.33855555555555, 'dec':-30.0633333333333, 'mag':3.02} 
, {'name':'Mu  Gem', 'ra':6.38266666666667, 'dec':22.5136111111111, 'mag':2.88} 
, {'name':'Murzim', 'ra':6.37833333333333, 'dec':-17.9558333333333, 'mag':1.98} 
, {'name':'Del Col', 'ra':6.36855555555555, 'dec':-33.4363888888889, 'mag':3.85} 
, {'name':'Canopus', 'ra':6.39919444444445, 'dec':-52.6958333333333, 'mag':-0.72} 
, {'name':'Gam Gem', 'ra':6.62852777777778, 'dec':16.3991666666667, 'mag':1.93} 
, {'name':'Nu 2CMa', 'ra':6.61138888888889, 'dec':-19.2558333333333, 'mag':3.95} 
, {'name':'Nu  Pup', 'ra':6.62936111111111, 'dec':-43.1961111111111, 'mag':3.17} 
, {'name':'Eps Gem', 'ra':6.73219444444445, 'dec':25.1311111111111, 'mag':2.98} 
, {'name':'Xi  Gem', 'ra':6.75483333333333, 'dec':12.8955555555556, 'mag':3.36} 
, {'name':'Sirius', 'ra':6.75247222222222, 'dec':-16.7161111111111, 'mag':-1.46} 
, {'name':'Kap CMa', 'ra':6.83069444444444, 'dec':-32.5086111111111, 'mag':3.96} 
, {'name':'The Gem', 'ra':6.87980555555556, 'dec':33.9611111111111, 'mag':3.6} 
, {'name':'Alp Pic', 'ra':6.80316666666667, 'dec':-61.9413888888889, 'mag':3.27} 
, {'name':'Tau Pup', 'ra':6.83227777777778, 'dec':-50.6147222222222, 'mag':2.93} 
, {'name':'Omi1CMa', 'ra':6.90219444444445, 'dec':-24.1838888888889, 'mag':3.87} 
, {'name':'Adhara', 'ra':6.97708333333333, 'dec':-28.9722222222222, 'mag':1.5} 
, {'name':'Sig CMa', 'ra':7.02863888888889, 'dec':-27.9347222222222, 'mag':3.47} 
, {'name':'Zet Gem', 'ra':7.06847222222222, 'dec':20.5702777777778, 'mag':3.79} 
, {'name':'Omi2CMa', 'ra':7.05041666666667, 'dec':-23.8333333333333, 'mag':3.02} 
, {'name':'Wezen', 'ra':7.13986111111111, 'dec':-26.3933333333333, 'mag':1.84} 
, {'name':'Gam2Vol', 'ra':7.14580555555556, 'dec':-70.4988888888889, 'mag':3.78} 
, {'name':'Ome CMa', 'ra':7.24686111111111, 'dec':-26.7727777777778, 'mag':3.85} 
, {'name':'Lam Gem', 'ra':7.30155555555556, 'dec':16.5402777777778, 'mag':3.58} 
, {'name':'Pi  Pup', 'ra':7.28572222222222, 'dec':-37.0975, 'mag':2.7} 
, {'name':'Del Gem', 'ra':7.33538888888889, 'dec':21.9822222222222, 'mag':3.53} 
, {'name':'Del Vol', 'ra':7.2805, 'dec':-67.9572222222222, 'mag':3.98} 
, {'name':'Iot Gem', 'ra':7.42877777777778, 'dec':27.7980555555556, 'mag':3.79} 
, {'name':'Eta CMa', 'ra':7.40158333333333, 'dec':-29.3030555555556, 'mag':2.45} 
, {'name':'Bet CMi', 'ra':7.4525, 'dec':8.28944444444444, 'mag':2.9} 
, {'name':'Sig Pup', 'ra':7.48716666666667, 'dec':-43.3013888888889, 'mag':3.25} 
, {'name':'Alp Gem', 'ra':7.57666666666667, 'dec':31.8886111111111, 'mag':2.88} 
, {'name':'Castor', 'ra':7.57666666666667, 'dec':31.8883333333333, 'mag':1.98} 
, {'name':'Procyon', 'ra':7.65502777777778, 'dec':5.225, 'mag':0.38} 
, {'name':'Alp Mon', 'ra':7.68744444444445, 'dec':-9.55111111111111, 'mag':3.93} 
, {'name':'Kap Gem', 'ra':7.74077777777778, 'dec':24.3980555555556, 'mag':3.57} 
, {'name':'Pollux', 'ra':7.75525, 'dec':28.0261111111111, 'mag':1.14} 
, {'name':'Pup', 'ra':7.73013888888889, 'dec':-28.9547222222222, 'mag':3.96} 
, {'name':'Zet Vol', 'ra':7.697, 'dec':-72.6061111111111, 'mag':3.95} 
, {'name':'Xi  Pup', 'ra':7.82158333333333, 'dec':-24.8597222222222, 'mag':3.34} 
, {'name':'Chi Car', 'ra':7.94630555555556, 'dec':-52.9822222222222, 'mag':3.47} 
, {'name':'Zet Pup', 'ra':8.05975, 'dec':-40.0033333333333, 'mag':2.25} 
, {'name':'Rho Pup', 'ra':8.12572222222222, 'dec':-24.3041666666667, 'mag':2.81} 
, {'name':'Gam2Vel', 'ra':8.15888888888889, 'dec':-47.3366666666667, 'mag':1.78} 
, {'name':'Bet Cnc', 'ra':8.27525, 'dec':9.18555555555556, 'mag':3.52} 
, {'name':'Eps Car', 'ra':8.37522222222222, 'dec':-59.5097222222222, 'mag':1.86} 
, {'name':'Omi UMa', 'ra':8.50441666666667, 'dec':60.7180555555556, 'mag':3.36} 
, {'name':'Bet Vol', 'ra':8.42894444444444, 'dec':-66.1369444444445, 'mag':3.77} 
, {'name':'Bet Pyx', 'ra':8.66838888888889, 'dec':-35.3083333333333, 'mag':3.97} 
, {'name':'Del Cnc', 'ra':8.74475, 'dec':18.1541666666667, 'mag':3.94} 
, {'name':'Alp Pyx', 'ra':8.72652777777778, 'dec':-33.1863888888889, 'mag':3.68} 
, {'name':'Eps Hya', 'ra':8.77961111111111, 'dec':6.41888888888889, 'mag':3.38} 
, {'name':'Del Vel', 'ra':8.74505555555555, 'dec':-54.7083333333333, 'mag':1.96} 
, {'name':'Zet Hya', 'ra':8.92322222222222, 'dec':5.94555555555556, 'mag':3.11} 
, {'name':'Iot UMa', 'ra':8.98677777777778, 'dec':48.0416666666667, 'mag':3.14} 
, {'name':'Kap UMa', 'ra':9.06041666666667, 'dec':47.1566666666667, 'mag':3.6} 
, {'name':'Alp Vol', 'ra':9.04077777777778, 'dec':-66.3961111111111, 'mag':4} 
, {'name':'Lam Vel', 'ra':9.13327777777778, 'dec':-43.4325, 'mag':2.21} 
, {'name':'The Hya', 'ra':9.23941666666667, 'dec':2.31416666666667, 'mag':3.88} 
, {'name':'Bet Car', 'ra':9.22, 'dec':-69.7172222222222, 'mag':1.68} 
, {'name':'Lyn', 'ra':9.31408333333333, 'dec':36.8025, 'mag':3.82} 
, {'name':'Iot Car', 'ra':9.28483333333333, 'dec':-59.2752777777778, 'mag':2.25} 
, {'name':'Alp Lyn', 'ra':9.35091666666667, 'dec':34.3925, 'mag':3.13} 
, {'name':'Kap Vel', 'ra':9.36855555555556, 'dec':-55.0108333333333, 'mag':2.5} 
, {'name':'Alphard', 'ra':9.45977777777778, 'dec':-8.65861111111111, 'mag':1.98} 
, {'name':'UMa', 'ra':9.52547222222222, 'dec':63.0619444444444, 'mag':3.67} 
, {'name':'The UMa', 'ra':9.54761111111111, 'dec':51.6772222222222, 'mag':3.17} 
, {'name':'Psi Vel', 'ra':9.51166666666667, 'dec':-40.4666666666667, 'mag':3.6} 
, {'name':'Iot Hya', 'ra':9.66427777777778, 'dec':-1.14277777777778, 'mag':3.91} 
, {'name':'Omi Leo', 'ra':9.68583333333333, 'dec':9.89222222222222, 'mag':3.52} 
, {'name':'Eps Leo', 'ra':9.76419444444444, 'dec':23.7741666666667, 'mag':2.98} 
, {'name':'Ups UMa', 'ra':9.84983333333333, 'dec':59.0386111111111, 'mag':3.8} 
, {'name':'Ups Car', 'ra':9.78502777777778, 'dec':-65.0719444444444, 'mag':3.01} 
, {'name':'Mu  Leo', 'ra':9.87938888888889, 'dec':26.0069444444444, 'mag':3.88} 
, {'name':'Phi Vel', 'ra':9.94772222222222, 'dec':-54.5677777777778, 'mag':3.54} 
, {'name':'Eta Leo', 'ra':10.1222222222222, 'dec':16.7627777777778, 'mag':3.52} 
, {'name':'Regulus', 'ra':10.1395277777778, 'dec':11.9672222222222, 'mag':1.35} 
, {'name':'Lam Hya', 'ra':10.1764722222222, 'dec':-12.3541666666667, 'mag':3.61} 
, {'name':'Zet Leo', 'ra':10.2781666666667, 'dec':23.4172222222222, 'mag':3.44} 
, {'name':'Lam UMa', 'ra':10.2849444444444, 'dec':42.9144444444444, 'mag':3.45} 
, {'name':'Ome Car', 'ra':10.2289444444444, 'dec':-70.0380555555556, 'mag':3.32} 
, {'name':'Algieba', 'ra':10.3328611111111, 'dec':19.8416666666667, 'mag':2.61} 
, {'name':'Gam2Leo', 'ra':10.3329444444444, 'dec':19.8405555555556, 'mag':3.8} 
, {'name':'Mu  UMa', 'ra':10.3721388888889, 'dec':41.4994444444444, 'mag':3.05} 
, {'name':'Mu  Hya', 'ra':10.4348333333333, 'dec':-16.8363888888889, 'mag':3.81} 
, {'name':'Rho Leo', 'ra':10.5468611111111, 'dec':9.30666666666667, 'mag':3.85} 
, {'name':'The Car', 'ra':10.7159444444444, 'dec':-64.3944444444444, 'mag':2.76} 
, {'name':'Mu  Vel', 'ra':10.7795, 'dec':-49.42, 'mag':2.69} 
, {'name':'Nu  Hya', 'ra':10.8270833333333, 'dec':-16.1936111111111, 'mag':3.11} 
, {'name':'LMi', 'ra':10.8885277777778, 'dec':34.215, 'mag':3.83} 
, {'name':'Kochab', 'ra':11.0306944444444, 'dec':56.3825, 'mag':2.37} 
, {'name':'Dubhe', 'ra':11.0621388888889, 'dec':61.7508333333333, 'mag':1.79} 
, {'name':'Psi UMa', 'ra':11.1610555555556, 'dec':44.4986111111111, 'mag':3.01} 
, {'name':'Zosma', 'ra':11.2351388888889, 'dec':20.5236111111111, 'mag':2.56} 
, {'name':'The Leo', 'ra':11.2373333333333, 'dec':15.4294444444444, 'mag':3.34} 
, {'name':'Nu  UMa', 'ra':11.3079722222222, 'dec':33.0941666666667, 'mag':3.48} 
, {'name':'Del Crt', 'ra':11.3223611111111, 'dec':-14.7786111111111, 'mag':3.56} 
, {'name':'Pi  Cen', 'ra':11.3501111111111, 'dec':-54.4911111111111, 'mag':3.89} 
, {'name':'Iot Leo', 'ra':11.39875, 'dec':10.5291666666667, 'mag':3.94} 
, {'name':'Lam Dra', 'ra':11.5233888888889, 'dec':69.3311111111111, 'mag':3.84} 
, {'name':'Xi  Hya', 'ra':11.5500277777778, 'dec':-31.8577777777778, 'mag':3.54} 
, {'name':'Lam Cen', 'ra':11.5963333333333, 'dec':-63.0197222222222, 'mag':3.13} 
, {'name':'Chi UMa', 'ra':11.7675, 'dec':47.7794444444444, 'mag':3.71} 
, {'name':'Lam Mus', 'ra':11.7601111111111, 'dec':-66.7286111111111, 'mag':3.64} 
, {'name':'Denebola', 'ra':11.8176666666667, 'dec':14.5719444444444, 'mag':2.14} 
, {'name':'Bet Vir', 'ra':11.8449166666667, 'dec':1.76472222222222, 'mag':3.61} 
, {'name':'Phecda', 'ra':11.8971666666667, 'dec':53.6947222222222, 'mag':2.44} 
, {'name':'Del Cen', 'ra':12.1393055555556, 'dec':-50.7225, 'mag':2.6} 
, {'name':'Eps Crv', 'ra':12.16875, 'dec':-22.6197222222222, 'mag':3} 
, {'name':'Rho Cen', 'ra':12.1941944444444, 'dec':-52.3686111111111, 'mag':3.96} 
, {'name':'Del Cru', 'ra':12.2524166666667, 'dec':-58.7488888888889, 'mag':2.8} 
, {'name':'Megrez', 'ra':12.2571111111111, 'dec':57.0325, 'mag':3.31} 
, {'name':'Gam Crv', 'ra':12.2634444444444, 'dec':-17.5419444444444, 'mag':2.59} 
, {'name':'Eta Vir', 'ra':12.3317777777778, 'dec':-0.666944444444444, 'mag':3.89} 
, {'name':'Eps Cru', 'ra':12.356, 'dec':-60.4011111111111, 'mag':3.59} 
, {'name':'Alp1Cru', 'ra':12.4433055555556, 'dec':-63.0991666666667, 'mag':1.33} 
, {'name':'Alp2Cru', 'ra':12.4434722222222, 'dec':-63.0994444444444, 'mag':1.73} 
, {'name':'Sig Cen', 'ra':12.4673333333333, 'dec':-50.2305555555556, 'mag':3.91} 
, {'name':'Del Crv', 'ra':12.49775, 'dec':-16.5155555555556, 'mag':2.95} 
, {'name':'Gam Cru', 'ra':12.5194166666667, 'dec':-57.1133333333333, 'mag':1.63} 
, {'name':'Gam Mus', 'ra':12.5411111111111, 'dec':-72.1330555555555, 'mag':3.87} 
, {'name':'Bet Crv', 'ra':12.5731111111111, 'dec':-23.3966666666667, 'mag':2.65} 
, {'name':'Kap Dra', 'ra':12.5580555555556, 'dec':69.7883333333333, 'mag':3.87} 
, {'name':'Alp Mus', 'ra':12.6197222222222, 'dec':-69.1355555555556, 'mag':2.69} 
, {'name':'Tau Cen', 'ra':12.6283888888889, 'dec':-48.5411111111111, 'mag':3.86} 
, {'name':'Gam Cen', 'ra':12.6919444444444, 'dec':-48.9597222222222, 'mag':2.17} 
, {'name':'Gam Vir', 'ra':12.6943333333333, 'dec':-1.44944444444444, 'mag':3.65} 
, {'name':'Gam Vir', 'ra':12.6943333333333, 'dec':-1.44944444444444, 'mag':3.68} 
, {'name':'Bet Mus', 'ra':12.7713611111111, 'dec':-68.1080555555556, 'mag':3.05} 
, {'name':'Bet Cru', 'ra':12.7953333333333, 'dec':-59.6886111111111, 'mag':1.25} 
, {'name':'Alioth', 'ra':12.9004722222222, 'dec':55.9597222222222, 'mag':1.77} 
, {'name':'Del Vir', 'ra':12.9267222222222, 'dec':3.3975, 'mag':3.38} 
, {'name':'Alp2CVn', 'ra':12.9338055555556, 'dec':38.3183333333333, 'mag':2.9} 
, {'name':'Del Mus', 'ra':13.0378333333333, 'dec':-71.5488888888889, 'mag':3.62} 
, {'name':'Eps Vir', 'ra':13.0362777777778, 'dec':10.9591666666667, 'mag':2.83} 
, {'name':'Gam Hya', 'ra':13.3153611111111, 'dec':-23.1716666666667, 'mag':3} 
, {'name':'Iot Cen', 'ra':13.3432777777778, 'dec':-36.7122222222222, 'mag':2.75} 
, {'name':'Mizar', 'ra':13.39875, 'dec':54.9252777777778, 'mag':2.27} 
, {'name':'Zet UMa', 'ra':13.399, 'dec':54.9216666666667, 'mag':3.95} 
, {'name':'Spica', 'ra':13.4198888888889, 'dec':-11.1613888888889, 'mag':0.98} 
, {'name':'Zet Vir', 'ra':13.5782222222222, 'dec':-0.595833333333333, 'mag':3.37} 
, {'name':'Eps Cen', 'ra':13.6647777777778, 'dec':-53.4663888888889, 'mag':2.3} 
, {'name':'Nu  Cen', 'ra':13.8250833333333, 'dec':-41.6877777777778, 'mag':3.41} 
, {'name':'Alkaid', 'ra':13.7923333333333, 'dec':49.3133333333333, 'mag':1.86} 
, {'name':'Mu  Cen', 'ra':13.8269444444444, 'dec':-42.4738888888889, 'mag':3.04} 
, {'name':'Zet Cen', 'ra':13.9256666666667, 'dec':-47.2883333333333, 'mag':2.55} 
, {'name':'Eta Boo', 'ra':13.9114166666667, 'dec':18.3977777777778, 'mag':2.68} 
, {'name':'Phi Cen', 'ra':13.9711944444444, 'dec':-42.1008333333333, 'mag':3.83} 
, {'name':'Ups1Cen', 'ra':13.978, 'dec':-44.8036111111111, 'mag':3.87} 
, {'name':'Agena', 'ra':14.0637222222222, 'dec':-60.3730555555556, 'mag':0.61} 
, {'name':'Pi  Hya', 'ra':14.1061944444444, 'dec':-26.6825, 'mag':3.27} 
, {'name':'The Cen', 'ra':14.1113888888889, 'dec':-36.37, 'mag':2.06} 
, {'name':'Alp Dra', 'ra':14.0731388888889, 'dec':64.3758333333333, 'mag':3.65} 
, {'name':'Arcturus', 'ra':14.2610277777778, 'dec':19.1825, 'mag':-0.04} 
, {'name':'Iot Lup', 'ra':14.3233888888889, 'dec':-46.0577777777778, 'mag':3.55} 
, {'name':'Rho Boo', 'ra':14.5305, 'dec':30.3713888888889, 'mag':3.58} 
, {'name':'Gam Boo', 'ra':14.5346388888889, 'dec':38.3083333333333, 'mag':3.03} 
, {'name':'Eta Cen', 'ra':14.5917777777778, 'dec':-42.1577777777778, 'mag':2.31} 
, {'name':'Alp1Cen', 'ra':14.6599722222222, 'dec':-60.8352777777778, 'mag':-0.01} 
, {'name':'Alp2Cen', 'ra':14.6600277777778, 'dec':-60.8355555555556, 'mag':1.33} 
, {'name':'Alp Cir', 'ra':14.7084444444444, 'dec':-64.9752777777778, 'mag':3.19} 
, {'name':'Alp Lup', 'ra':14.6988333333333, 'dec':-47.3883333333333, 'mag':2.3} 
, {'name':'Alp Aps', 'ra':14.7976666666667, 'dec':-79.0447222222222, 'mag':3.83} 
, {'name':'Mu  Vir', 'ra':14.7176666666667, 'dec':-5.65833333333333, 'mag':3.88} 
, {'name':'Eps Boo', 'ra':14.7497777777778, 'dec':27.0741666666667, 'mag':2.7} 
, {'name':'Vir', 'ra':14.7708055555556, 'dec':1.89277777777778, 'mag':3.72} 
, {'name':'Alp2Lib', 'ra':14.8479722222222, 'dec':-16.0416666666667, 'mag':2.75} 
, {'name':'Bet UMi', 'ra':14.8450833333333, 'dec':74.1555555555556, 'mag':2.08} 
, {'name':'Bet Lup', 'ra':14.9755277777778, 'dec':-43.1338888888889, 'mag':2.68} 
, {'name':'Kap Cen', 'ra':14.9860277777778, 'dec':-42.1041666666667, 'mag':3.13} 
, {'name':'Bet Boo', 'ra':15.0324444444444, 'dec':40.3905555555556, 'mag':3.5} 
, {'name':'Sig Lib', 'ra':15.0678333333333, 'dec':-25.2819444444444, 'mag':3.29} 
, {'name':'Kap1Lup', 'ra':15.1989166666667, 'dec':-48.7377777777778, 'mag':3.87} 
, {'name':'Zet Lup', 'ra':15.20475, 'dec':-52.0991666666667, 'mag':3.41} 
, {'name':'Gam TrA', 'ra':15.3151666666667, 'dec':-68.6794444444444, 'mag':2.89} 
, {'name':'Del Boo', 'ra':15.2583888888889, 'dec':33.3147222222222, 'mag':3.47} 
, {'name':'Bet Lib', 'ra':15.2834444444444, 'dec':-9.38305555555556, 'mag':2.61} 
, {'name':'Del Lup', 'ra':15.3561944444444, 'dec':-40.6475, 'mag':3.22} 
, {'name':'Phi1Lup', 'ra':15.3634444444444, 'dec':-36.2613888888889, 'mag':3.56} 
, {'name':'Eps Lup', 'ra':15.3780277777778, 'dec':-44.6894444444444, 'mag':3.37} 
, {'name':'Gam UMi', 'ra':15.3454722222222, 'dec':71.8338888888889, 'mag':3.05} 
, {'name':'Iot Dra', 'ra':15.4155, 'dec':58.9661111111111, 'mag':3.29} 
, {'name':'Bet CrB', 'ra':15.4638055555556, 'dec':29.1058333333333, 'mag':3.68} 
, {'name':'Gam Lup', 'ra':15.5856944444444, 'dec':-41.1669444444444, 'mag':2.78} 
, {'name':'Gam Lib', 'ra':15.5921111111111, 'dec':-14.7894444444444, 'mag':3.91} 
, {'name':'Del Ser', 'ra':15.5800277777778, 'dec':10.5375, 'mag':3.8} 
, {'name':'Del Ser', 'ra':15.5800277777778, 'dec':10.5391666666667, 'mag':3.8} 
, {'name':'Alp CrB', 'ra':15.5781388888889, 'dec':26.7147222222222, 'mag':2.23} 
, {'name':'Ups Lib', 'ra':15.6170833333333, 'dec':-28.135, 'mag':3.58} 
, {'name':'Tau Lib', 'ra':15.6442777777778, 'dec':-29.7777777777778, 'mag':3.66} 
, {'name':'Gam CrB', 'ra':15.7123888888889, 'dec':26.2955555555556, 'mag':3.84} 
, {'name':'Alp Ser', 'ra':15.7378055555556, 'dec':6.42555555555556, 'mag':2.65} 
, {'name':'Bet Ser', 'ra':15.7698055555556, 'dec':15.4219444444444, 'mag':3.67} 
, {'name':'Mu  Ser', 'ra':15.827, 'dec':-3.43027777777778, 'mag':3.53} 
, {'name':'Chi Lup', 'ra':15.8493055555556, 'dec':-33.6272222222222, 'mag':3.95} 
, {'name':'Eps Ser', 'ra':15.8469444444444, 'dec':4.47777777777778, 'mag':3.71} 
, {'name':'Bet TrA', 'ra':15.9190277777778, 'dec':-63.4305555555556, 'mag':2.85} 
, {'name':'Rho Sco', 'ra':15.9480833333333, 'dec':-29.2141666666667, 'mag':3.88} 
, {'name':'Gam Ser', 'ra':15.9408888888889, 'dec':15.6616666666667, 'mag':3.85} 
, {'name':'Pi  Sco', 'ra':15.9808611111111, 'dec':-26.1141666666667, 'mag':2.89} 
, {'name':'Eta Lup', 'ra':16.0020277777778, 'dec':-38.3969444444444, 'mag':3.41} 
, {'name':'Del Sco', 'ra':16.0055555555556, 'dec':-22.6216666666667, 'mag':2.32} 
, {'name':'Bet1Sco', 'ra':16.0906111111111, 'dec':-19.8055555555556, 'mag':2.62} 
, {'name':'Ome1Sco', 'ra':16.1134444444444, 'dec':-20.6691666666667, 'mag':3.96} 
, {'name':'Del TrA', 'ra':16.2573055555556, 'dec':-63.6855555555556, 'mag':3.85} 
, {'name':'Del Oph', 'ra':16.2390833333333, 'dec':-3.69444444444444, 'mag':2.74} 
, {'name':'Eps Oph', 'ra':16.3053611111111, 'dec':-4.6925, 'mag':3.24} 
, {'name':'Sig Sco', 'ra':16.3531388888889, 'dec':-25.5927777777778, 'mag':2.89} 
, {'name':'Tau Her', 'ra':16.329, 'dec':46.3133333333333, 'mag':3.89} 
, {'name':'Gam Her', 'ra':16.3653333333333, 'dec':19.1530555555556, 'mag':3.75} 
, {'name':'Gam Aps', 'ra':16.5575, 'dec':-78.8972222222222, 'mag':3.89} 
, {'name':'Eta Dra', 'ra':16.3998611111111, 'dec':61.5141666666667, 'mag':2.74} 
, {'name':'Antares', 'ra':16.4901111111111, 'dec':-26.4319444444444, 'mag':0.96} 
, {'name':'Bet Her', 'ra':16.5036666666667, 'dec':21.4897222222222, 'mag':2.77} 
, {'name':'Lam Oph', 'ra':16.5152222222222, 'dec':1.98388888888889, 'mag':3.82} 
, {'name':'Tau Sco', 'ra':16.5980555555556, 'dec':-28.2161111111111, 'mag':2.82} 
, {'name':'Zet Oph', 'ra':16.6193055555556, 'dec':-10.5672222222222, 'mag':2.56} 
, {'name':'Zet Her', 'ra':16.6881111111111, 'dec':31.6030555555556, 'mag':2.81} 
, {'name':'Alp TrA', 'ra':16.8110833333333, 'dec':-69.0277777777778, 'mag':1.92} 
, {'name':'Eta Her', 'ra':16.7149444444444, 'dec':38.9222222222222, 'mag':3.53} 
, {'name':'Eta Ara', 'ra':16.82975, 'dec':-59.0413888888889, 'mag':3.76} 
, {'name':'Eps Sco', 'ra':16.8360555555556, 'dec':-34.2933333333333, 'mag':2.29} 
, {'name':'Mu 1Sco', 'ra':16.8645, 'dec':-38.0475, 'mag':3.08} 
, {'name':'Mu 2Sco', 'ra':16.87225, 'dec':-38.0175, 'mag':3.57} 
, {'name':'Zet2Sco', 'ra':16.9097222222222, 'dec':-42.3613888888889, 'mag':3.62} 
, {'name':'Zet Ara', 'ra':16.977, 'dec':-55.9902777777778, 'mag':3.13} 
, {'name':'Kap Oph', 'ra':16.9611388888889, 'dec':9.375, 'mag':3.2} 
, {'name':'Eps Her', 'ra':17.0048333333333, 'dec':30.9263888888889, 'mag':3.92} 
, {'name':'Eta Oph', 'ra':17.1729722222222, 'dec':-15.7247222222222, 'mag':2.43} 
, {'name':'Eta Sco', 'ra':17.2025555555556, 'dec':-43.2391666666667, 'mag':3.33} 
, {'name':'Zet Dra', 'ra':17.1464444444444, 'dec':65.7147222222222, 'mag':3.17} 
, {'name':'Alp1Her', 'ra':17.2441388888889, 'dec':14.3902777777778, 'mag':3.48} 
, {'name':'Del Her', 'ra':17.2505277777778, 'dec':24.8391666666667, 'mag':3.14} 
, {'name':'Pi  Her', 'ra':17.2507777777778, 'dec':36.8091666666667, 'mag':3.16} 
, {'name':'The Oph', 'ra':17.3668333333333, 'dec':-24.9994444444444, 'mag':3.27} 
, {'name':'Bet Ara', 'ra':17.4216666666667, 'dec':-55.53, 'mag':2.85} 
, {'name':'Gam Ara', 'ra':17.4232222222222, 'dec':-56.3775, 'mag':3.34} 
, {'name':'Del Ara', 'ra':17.5183055555556, 'dec':-60.6838888888889, 'mag':3.62} 
, {'name':'Ups Sco', 'ra':17.5127222222222, 'dec':-37.2958333333333, 'mag':2.69} 
, {'name':'Alp Ara', 'ra':17.5306944444444, 'dec':-49.8761111111111, 'mag':2.95} 
, {'name':'Lam Sco', 'ra':17.5601388888889, 'dec':-37.1038888888889, 'mag':1.63} 
, {'name':'Bet Dra', 'ra':17.5072222222222, 'dec':52.3013888888889, 'mag':2.79} 
, {'name':'The Sco', 'ra':17.622, 'dec':-42.9977777777778, 'mag':1.87} 
, {'name':'Alp Oph', 'ra':17.58225, 'dec':12.56, 'mag':2.08} 
, {'name':'Xi  Ser', 'ra':17.6264444444444, 'dec':-15.3986111111111, 'mag':3.54} 
, {'name':'Kap Sco', 'ra':17.7081388888889, 'dec':-39.03, 'mag':2.41} 
, {'name':'Eta Pav', 'ra':17.7622222222222, 'dec':-64.7238888888889, 'mag':3.62} 
, {'name':'Iot Her', 'ra':17.65775, 'dec':46.0063888888889, 'mag':3.8} 
, {'name':'Bet Oph', 'ra':17.7245555555556, 'dec':4.56722222222222, 'mag':2.77} 
, {'name':'Iot1Sco', 'ra':17.7930833333333, 'dec':-40.1269444444444, 'mag':3.03} 
, {'name':'Mu  Her', 'ra':17.7743055555556, 'dec':27.7205555555556, 'mag':3.42} 
, {'name':'Gam Oph', 'ra':17.7982222222222, 'dec':2.70722222222222, 'mag':3.75} 
, {'name':'Xi  Dra', 'ra':17.8921388888889, 'dec':56.8727777777778, 'mag':3.75} 
, {'name':'The Her', 'ra':17.9375555555556, 'dec':37.2505555555556, 'mag':3.86} 
, {'name':'Nu  Oph', 'ra':17.9837777777778, 'dec':-9.77361111111111, 'mag':3.34} 
, {'name':'Xi  Her', 'ra':17.96275, 'dec':29.2477777777778, 'mag':3.7} 
, {'name':'Gam Dra', 'ra':17.9434444444444, 'dec':51.4888888888889, 'mag':2.23} 
, {'name':'Oph', 'ra':18.01075, 'dec':2.93166666666667, 'mag':3.97} 
, {'name':'The Ara', 'ra':18.1105277777778, 'dec':-50.0916666666667, 'mag':3.66} 
, {'name':'Gam2Sgr', 'ra':18.0968055555556, 'dec':-30.4241666666667, 'mag':2.99} 
, {'name':'Oph', 'ra':18.1225, 'dec':9.56388888888889, 'mag':3.73} 
, {'name':'Omi Her', 'ra':18.1257222222222, 'dec':28.7625, 'mag':3.83} 
, {'name':'Mu  Sgr', 'ra':18.2293888888889, 'dec':-21.0588888888889, 'mag':3.86} 
, {'name':'Eta Sgr', 'ra':18.2937777777778, 'dec':-36.7616666666667, 'mag':3.11} 
, {'name':'Del Sgr', 'ra':18.3499166666667, 'dec':-29.8280555555556, 'mag':2.7} 
, {'name':'Eta Ser', 'ra':18.3551666666667, 'dec':-2.89888888888889, 'mag':3.26} 
, {'name':'Kaus Aust', 'ra':18.4028611111111, 'dec':-34.3847222222222, 'mag':1.85} 
, {'name':'Her', 'ra':18.3949722222222, 'dec':21.7697222222222, 'mag':3.84} 
, {'name':'Alp Tel', 'ra':18.4495555555556, 'dec':-45.9683333333333, 'mag':3.51} 
, {'name':'Lam Sgr', 'ra':18.4661666666667, 'dec':-25.4216666666667, 'mag':2.81} 
, {'name':'Chi Dra', 'ra':18.3509444444444, 'dec':72.7327777777778, 'mag':3.57} 
, {'name':'Alp Sct', 'ra':18.5867777777778, 'dec':-8.24416666666667, 'mag':3.85} 
, {'name':'Vega', 'ra':18.6156388888889, 'dec':38.7836111111111, 'mag':0.03} 
, {'name':'Phi Sgr', 'ra':18.7609444444444, 'dec':-26.9908333333333, 'mag':3.17} 
, {'name':'Bet Lyr', 'ra':18.8346666666667, 'dec':33.3627777777778, 'mag':3.45} 
, {'name':'Sig Sgr', 'ra':18.9210833333333, 'dec':-26.2966666666667, 'mag':2.02} 
, {'name':'Xi 2Sgr', 'ra':18.9621666666667, 'dec':-21.1066666666667, 'mag':3.51} 
, {'name':'Gam Lyr', 'ra':18.9823888888889, 'dec':32.6894444444444, 'mag':3.24} 
, {'name':'Zet Sgr', 'ra':19.0435277777778, 'dec':-29.8802777777778, 'mag':2.6} 
, {'name':'Omi Sgr', 'ra':19.0780555555556, 'dec':-21.7416666666667, 'mag':3.77} 
, {'name':'Tau Sgr', 'ra':19.1156666666667, 'dec':-27.6705555555556, 'mag':3.32} 
, {'name':'Zet Aql', 'ra':19.0901666666667, 'dec':13.8633333333333, 'mag':2.99} 
, {'name':'Lam Aql', 'ra':19.1041388888889, 'dec':-4.8825, 'mag':3.44} 
, {'name':'Pi  Sgr', 'ra':19.1627222222222, 'dec':-21.0236111111111, 'mag':2.89} 
, {'name':'Del Dra', 'ra':19.20925, 'dec':67.6616666666667, 'mag':3.07} 
, {'name':'Kap Cyg', 'ra':19.2850555555556, 'dec':53.3686111111111, 'mag':3.77} 
, {'name':'Rho1Sgr', 'ra':19.3612222222222, 'dec':-17.8472222222222, 'mag':3.93} 
, {'name':'Alp Sgr', 'ra':19.3981111111111, 'dec':-40.6161111111111, 'mag':3.97} 
, {'name':'Del Aql', 'ra':19.4249722222222, 'dec':3.11472222222222, 'mag':3.36} 
, {'name':'Bet1Cyg', 'ra':19.5120277777778, 'dec':27.9597222222222, 'mag':3.08} 
, {'name':'Iot2Cyg', 'ra':19.4950833333333, 'dec':51.7297222222222, 'mag':3.79} 
, {'name':'Gam Aql', 'ra':19.771, 'dec':10.6133333333333, 'mag':2.72} 
, {'name':'Del Cyg', 'ra':19.7495833333333, 'dec':45.1308333333333, 'mag':2.87} 
, {'name':'Del Sge', 'ra':19.7898055555556, 'dec':18.5341666666667, 'mag':3.82} 
, {'name':'Altair', 'ra':19.8463888888889, 'dec':8.86833333333333, 'mag':0.77} 
, {'name':'Eta Aql', 'ra':19.8745555555556, 'dec':1.00555555555556, 'mag':3.9} 
, {'name':'Eps Dra', 'ra':19.8028888888889, 'dec':70.2677777777778, 'mag':3.83} 
, {'name':'Eps Pav', 'ra':20.0098611111111, 'dec':-72.9105555555556, 'mag':3.96} 
, {'name':'Bet Aql', 'ra':19.9218888888889, 'dec':6.40666666666667, 'mag':3.71} 
, {'name':'Eta Cyg', 'ra':19.9384444444444, 'dec':35.0833333333333, 'mag':3.89} 
, {'name':'Gam Sge', 'ra':19.9792777777778, 'dec':19.4922222222222, 'mag':3.47} 
, {'name':'Del Pav', 'ra':20.1454444444444, 'dec':-66.1819444444445, 'mag':3.56} 
, {'name':'The Aql', 'ra':20.1884166666667, 'dec':-0.821388888888889, 'mag':3.23} 
, {'name':'Cyg', 'ra':20.2271944444444, 'dec':46.7413888888889, 'mag':3.79} 
, {'name':'Cyg', 'ra':20.2578611111111, 'dec':47.7144444444444, 'mag':3.98} 
, {'name':'Alp2Cap', 'ra':20.3009166666667, 'dec':-12.5447222222222, 'mag':3.57} 
, {'name':'Bet Cap', 'ra':20.3501944444444, 'dec':-14.7813888888889, 'mag':3.08} 
, {'name':'Alp Pav', 'ra':20.4274722222222, 'dec':-56.735, 'mag':1.94} 
, {'name':'Gam Cyg', 'ra':20.3704722222222, 'dec':40.2566666666667, 'mag':2.2} 
, {'name':'Alp Ind', 'ra':20.6261111111111, 'dec':-47.2913888888889, 'mag':3.11} 
, {'name':'Bet Del', 'ra':20.6258333333333, 'dec':14.5952777777778, 'mag':3.63} 
, {'name':'Alp Del', 'ra':20.6606388888889, 'dec':15.9119444444444, 'mag':3.77} 
, {'name':'Bet Pav', 'ra':20.7493055555556, 'dec':-66.2030555555556, 'mag':3.42} 
, {'name':'Deneb', 'ra':20.6905277777778, 'dec':45.2802777777778, 'mag':1.25} 
, {'name':'Eps Cyg', 'ra':20.7701944444444, 'dec':33.9702777777778, 'mag':2.46} 
, {'name':'Eps Aqr', 'ra':20.7946111111111, 'dec':-9.49583333333333, 'mag':3.77} 
, {'name':'Eta Cep', 'ra':20.7548333333333, 'dec':61.8388888888889, 'mag':3.43} 
, {'name':'Bet Ind', 'ra':20.9135, 'dec':-58.4541666666667, 'mag':3.65} 
, {'name':'Nu  Cyg', 'ra':20.9528888888889, 'dec':41.1672222222222, 'mag':3.94} 
, {'name':'Xi  Cyg', 'ra':21.0821944444444, 'dec':43.9277777777778, 'mag':3.72} 
, {'name':'Zet Cyg', 'ra':21.2156111111111, 'dec':30.2269444444444, 'mag':3.2} 
, {'name':'Tau Cyg', 'ra':21.2465277777778, 'dec':38.0455555555556, 'mag':3.72} 
, {'name':'Alp Equ', 'ra':21.2637222222222, 'dec':5.24777777777778, 'mag':3.92} 
, {'name':'Alp Cep', 'ra':21.3096666666667, 'dec':62.5855555555556, 'mag':2.44} 
, {'name':'Zet Cap', 'ra':21.4444444444444, 'dec':-22.4113888888889, 'mag':3.74} 
, {'name':'Bet Aqr', 'ra':21.5259722222222, 'dec':-5.57111111111111, 'mag':2.91} 
, {'name':'Bet Cep', 'ra':21.4776666666667, 'dec':70.5608333333333, 'mag':3.23} 
, {'name':'Nu  Oct', 'ra':21.69125, 'dec':-77.39, 'mag':3.76} 
, {'name':'Gam Cap', 'ra':21.6681944444444, 'dec':-16.6622222222222, 'mag':3.68} 
, {'name':'Eps Peg', 'ra':21.7364444444444, 'dec':9.875, 'mag':2.39} 
, {'name':'Del Cap', 'ra':21.784, 'dec':-16.1272222222222, 'mag':2.87} 
, {'name':'Gam Gru', 'ra':21.8988055555556, 'dec':-37.365, 'mag':3.01} 
, {'name':'Alp Aqr', 'ra':22.0963888888889, 'dec':-0.319722222222222, 'mag':2.96} 
, {'name':'Alp Gru', 'ra':22.1372222222222, 'dec':-46.9611111111111, 'mag':1.74} 
, {'name':'Iot Peg', 'ra':22.1168611111111, 'dec':25.345, 'mag':3.76} 
, {'name':'The Peg', 'ra':22.17, 'dec':6.19777777777778, 'mag':3.53} 
, {'name':'Zet Cep', 'ra':22.1809166666667, 'dec':58.2011111111111, 'mag':3.35} 
, {'name':'Alp Tuc', 'ra':22.3083611111111, 'dec':-60.2597222222222, 'mag':2.86} 
, {'name':'Gam Aqr', 'ra':22.3609444444444, 'dec':-1.38722222222222, 'mag':3.84} 
, {'name':'Del1Gru', 'ra':22.4878333333333, 'dec':-43.4955555555556, 'mag':3.97} 
, {'name':'Del Cep', 'ra':22.4861944444444, 'dec':58.4152777777778, 'mag':3.75} 
, {'name':'Alp Lac', 'ra':22.5215277777778, 'dec':50.2825, 'mag':3.77} 
, {'name':'Zet Peg', 'ra':22.6910277777778, 'dec':10.8313888888889, 'mag':3.4} 
, {'name':'Bet Gru', 'ra':22.7111388888889, 'dec':-46.8847222222222, 'mag':2.1} 
, {'name':'Eta Peg', 'ra':22.7166944444444, 'dec':30.2213888888889, 'mag':2.94} 
, {'name':'Lam Peg', 'ra':22.7755277777778, 'dec':23.5655555555556, 'mag':3.95} 
, {'name':'Eps Gru', 'ra':22.80925, 'dec':-51.3169444444444, 'mag':3.49} 
, {'name':'Mu  Peg', 'ra':22.8333888888889, 'dec':24.6016666666667, 'mag':3.48} 
, {'name':'Iot Cep', 'ra':22.828, 'dec':66.2005555555556, 'mag':3.52} 
, {'name':'Lam Aqr', 'ra':22.8769166666667, 'dec':-7.57972222222222, 'mag':3.74} 
, {'name':'Del Aqr', 'ra':22.9108333333333, 'dec':-15.8208333333333, 'mag':3.27} 
, {'name':'Fomalhaut', 'ra':22.9608611111111, 'dec':-29.6222222222222, 'mag':1.16} 
, {'name':'Omi And', 'ra':23.0320277777778, 'dec':42.3261111111111, 'mag':3.62} 
, {'name':'Bet Peg', 'ra':23.0629166666667, 'dec':28.0827777777778, 'mag':2.42} 
, {'name':'Alp Peg', 'ra':23.0793611111111, 'dec':15.2052777777778, 'mag':2.49} 
, {'name':'Aqr', 'ra':23.1574444444444, 'dec':-21.1725, 'mag':3.66} 
, {'name':'Iot Gru', 'ra':23.1726666666667, 'dec':-45.2466666666667, 'mag':3.9} 
, {'name':'Gam Tuc', 'ra':23.2905, 'dec':-58.2358333333333, 'mag':3.99} 
, {'name':'Gam Psc', 'ra':23.2860833333333, 'dec':3.28222222222222, 'mag':3.69} 
, {'name':'Aqr', 'ra':23.3828333333333, 'dec':-20.1005555555556, 'mag':3.97} 
, {'name':'Lam And', 'ra':23.6260833333333, 'dec':46.4580555555556, 'mag':3.82} 
, {'name':'Gam Cep', 'ra':23.6557777777778, 'dec':77.6325, 'mag':3.21} 
];
