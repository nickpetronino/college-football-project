/**
 * Seed script to populate MongoDB with FBS school data
 * Run with: npm run seed:schools (from service directory)
 * Or: node scripts/seedSchools.js (from service directory)
 */

const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

// Load environment variables - try multiple paths
const rootEnvPath = path.join(__dirname, '../../.env');
const serviceEnvPath = path.join(__dirname, '../.env');

// Try loading from root first, then service directory
if (fs.existsSync(rootEnvPath)) {
    dotenv.config({ path: rootEnvPath });
} else if (fs.existsSync(serviceEnvPath)) {
    dotenv.config({ path: serviceEnvPath });
} else {
    // Try default dotenv behavior (loads from process.cwd())
    dotenv.config();
}

// Verify MONGODB_URI is loaded
if (!process.env.MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI environment variable is not set!');
    console.error('📝 Please create a .env file in the project root with:');
    console.error('   MONGODB_URI=mongodb://localhost:27017/your-database-name');
    console.error('\n💡 Example:');
    console.error('   MONGODB_URI=mongodb://localhost:27017/college-football');
    process.exit(1);
}

const connectDB = require('../config/database');
const School = require('../models/schoolModel');
const mongoose = require('mongoose');

// Helper function to create school entry with all fields
const createSchool = (name, logo, conference, city, state, colors, mascot, rivals = []) => ({
    name,
    logo,
    conference,
    city,
    state,
    colors,
    mascot,
    rivals,
});

// School data with all information including colors, mascot, and rivals
const schoolsData = [
    // SEC
    createSchool('Alabama', 'https://a.espncdn.com/i/teamlogos/ncaa/500/333.png', 'SEC', 'Tuscaloosa', 'Alabama', ['#9E1B32', '#FFFFFF'], 'Crimson Tide', ['Auburn', 'Tennessee', 'LSU']),
    createSchool('Auburn', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2.png', 'SEC', 'Auburn', 'Alabama', ['#0C2340', '#FFB612'], 'Tigers', ['Alabama', 'Georgia']),
    createSchool('Arkansas', 'https://a.espncdn.com/i/teamlogos/ncaa/500/8.png', 'SEC', 'Fayetteville', 'Arkansas', ['#9D2235', '#000000'], 'Razorbacks', ['LSU', 'Texas A&M', 'Missouri']),
    createSchool('Florida', 'https://a.espncdn.com/i/teamlogos/ncaa/500/57.png', 'SEC', 'Gainesville', 'Florida', ['#0021A5', '#FA4616'], 'Gators', ['Florida State', 'Georgia', 'Tennessee', 'LSU']),
    createSchool('Georgia', 'https://a.espncdn.com/i/teamlogos/ncaa/500/61.png', 'SEC', 'Athens', 'Georgia', ['#BA0C2F', '#000000'], 'Bulldogs', ['Florida', 'Auburn', 'Georgia Tech', 'Tennessee']),
    createSchool('Kentucky', 'https://a.espncdn.com/i/teamlogos/ncaa/500/96.png', 'SEC', 'Lexington', 'Kentucky', ['#003087', '#FFFFFF'], 'Wildcats', ['Louisville', 'Tennessee']),
    createSchool('LSU', 'https://a.espncdn.com/i/teamlogos/ncaa/500/99.png', 'SEC', 'Baton Rouge', 'Louisiana', ['#461D7C', '#FDD023'], 'Tigers', ['Alabama', 'Ole Miss', 'Florida', 'Arkansas', 'Texas A&M']),
    createSchool('Mississippi State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/344.png', 'SEC', 'Starkville', 'Mississippi', ['#660000', '#FFFFFF'], 'Bulldogs', ['Ole Miss']),
    createSchool('Missouri', 'https://a.espncdn.com/i/teamlogos/ncaa/500/142.png', 'SEC', 'Columbia', 'Missouri', ['#F1B82D', '#000000'], 'Tigers', ['Kansas', 'Arkansas', 'Nebraska']),
    createSchool('Ole Miss', 'https://a.espncdn.com/i/teamlogos/ncaa/500/145.png', 'SEC', 'Oxford', 'Mississippi', ['#00205B', '#FFFFFF'], 'Rebels', ['Mississippi State', 'LSU', 'Vanderbilt']),
    createSchool('Oklahoma', 'https://a.espncdn.com/i/teamlogos/ncaa/500/201.png', 'SEC', 'Norman', 'Oklahoma', ['#841617', '#FFFFFF'], 'Sooners', ['Texas', 'Oklahoma State', 'Nebraska']),
    createSchool('South Carolina', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2579.png', 'SEC', 'Columbia', 'South Carolina', ['#73000A', '#000000'], 'Gamecocks', ['Clemson', 'Georgia']),
    createSchool('Tennessee', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2633.png', 'SEC', 'Knoxville', 'Tennessee', ['#FF8200', '#FFFFFF'], 'Volunteers', ['Alabama', 'Florida', 'Georgia', 'Vanderbilt']),
    createSchool('Texas', 'https://a.espncdn.com/i/teamlogos/ncaa/500/251.png', 'SEC', 'Austin', 'Texas', ['#BF5700', '#FFFFFF'], 'Longhorns', ['Oklahoma', 'Texas A&M', 'Arkansas', 'Texas Tech']),
    createSchool('Texas A&M', 'https://a.espncdn.com/i/teamlogos/ncaa/500/245.png', 'SEC', 'College Station', 'Texas', ['#500000', '#FFFFFF'], 'Aggies', ['Texas', 'LSU', 'Arkansas']),
    createSchool('Vanderbilt', 'https://a.espncdn.com/i/teamlogos/ncaa/500/238.png', 'SEC', 'Nashville', 'Tennessee', ['#866D4B', '#FFFFFF'], 'Commodores', ['Tennessee', 'Ole Miss']),

    // Big Ten
    createSchool('Illinois', 'https://a.espncdn.com/i/teamlogos/ncaa/500/356.png', 'Big Ten', 'Champaign', 'Illinois', ['#FF552E', '#13294B'], 'Fighting Illini', ['Northwestern', 'Missouri']),
    createSchool('Indiana', 'https://a.espncdn.com/i/teamlogos/ncaa/500/84.png', 'Big Ten', 'Bloomington', 'Indiana', ['#7D110C', '#FFFFFF'], 'Hoosiers', ['Purdue', 'Kentucky']),
    createSchool('Iowa', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2294.png', 'Big Ten', 'Iowa City', 'Iowa', ['#000000', '#FFCD00'], 'Hawkeyes', ['Iowa State', 'Minnesota', 'Nebraska', 'Wisconsin']),
    createSchool('Maryland', 'https://a.espncdn.com/i/teamlogos/ncaa/500/120.png', 'Big Ten', 'College Park', 'Maryland', ['#E03A3E', '#FFD520'], 'Terrapins', ['Virginia', 'West Virginia', 'Penn State']),
    createSchool('Michigan', 'https://a.espncdn.com/i/teamlogos/ncaa/500/130.png', 'Big Ten', 'Ann Arbor', 'Michigan', ['#00274C', '#FFCB05'], 'Wolverines', ['Ohio State', 'Michigan State', 'Notre Dame', 'Minnesota']),
    createSchool('Michigan State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/127.png', 'Big Ten', 'East Lansing', 'Michigan', ['#18453B', '#FFFFFF'], 'Spartans', ['Michigan', 'Notre Dame', 'Penn State']),
    createSchool('Minnesota', 'https://a.espncdn.com/i/teamlogos/ncaa/500/135.png', 'Big Ten', 'Minneapolis', 'Minnesota', ['#7A0019', '#FFCC00'], 'Golden Gophers', ['Wisconsin', 'Iowa', 'Michigan']),
    createSchool('Nebraska', 'https://a.espncdn.com/i/teamlogos/ncaa/500/158.png', 'Big Ten', 'Lincoln', 'Nebraska', ['#E41C38', '#FDF2D9'], 'Cornhuskers', ['Oklahoma', 'Colorado', 'Iowa', 'Wisconsin']),
    createSchool('Northwestern', 'https://a.espncdn.com/i/teamlogos/ncaa/500/77.png', 'Big Ten', 'Evanston', 'Illinois', ['#4E2A84', '#FFFFFF'], 'Wildcats', ['Illinois', 'Notre Dame']),
    createSchool('Ohio State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/194.png', 'Big Ten', 'Columbus', 'Ohio', ['#BA0C2F', '#FFFFFF'], 'Buckeyes', ['Michigan', 'Penn State', 'Michigan State']),
    createSchool('Oregon', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2483.png', 'Big Ten', 'Eugene', 'Oregon', ['#154733', '#FEE123'], 'Ducks', ['Oregon State', 'Washington']),
    createSchool('Penn State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/213.png', 'Big Ten', 'State College', 'Pennsylvania', ['#002E62', '#FFFFFF'], 'Nittany Lions', ['Pitt', 'Ohio State', 'Michigan State']),
    createSchool('Purdue', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2509.png', 'Big Ten', 'West Lafayette', 'Indiana', ['#CEB888', '#000000'], 'Boilermakers', ['Indiana', 'Notre Dame']),
    createSchool('Rutgers', 'https://a.espncdn.com/i/teamlogos/ncaa/500/164.png', 'Big Ten', 'Piscataway', 'New Jersey', ['#CC0033', '#FFFFFF'], 'Scarlet Knights', ['Princeton', 'Maryland']),
    createSchool('UCLA', 'https://a.espncdn.com/i/teamlogos/ncaa/500/26.png', 'Big Ten', 'Los Angeles', 'California', ['#2D68C4', '#FFB81C'], 'Bruins', ['USC', 'Stanford']),
    createSchool('USC', 'https://a.espncdn.com/i/teamlogos/ncaa/500/30.png', 'Big Ten', 'Los Angeles', 'California', ['#990000', '#FFCC00'], 'Trojans', ['UCLA', 'Notre Dame', 'Stanford']),
    createSchool('Washington', 'https://a.espncdn.com/i/teamlogos/ncaa/500/264.png', 'Big Ten', 'Seattle', 'Washington', ['#4B2E83', '#B7A57A'], 'Huskies', ['Washington State', 'Oregon']),
    createSchool('Wisconsin', 'https://a.espncdn.com/i/teamlogos/ncaa/500/275.png', 'Big Ten', 'Madison', 'Wisconsin', ['#C5050C', '#FFFFFF'], 'Badgers', ['Minnesota', 'Iowa', 'Nebraska']),

    // Big 12
    createSchool('Arizona', 'https://a.espncdn.com/i/teamlogos/ncaa/500/12.png', 'Big 12', 'Tucson', 'Arizona', ['#003366', '#CC0033'], 'Wildcats', ['Arizona State', 'UCLA']),
    createSchool('Arizona State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/9.png', 'Big 12', 'Tempe', 'Arizona', ['#8C1D40', '#FFC627'], 'Sun Devils', ['Arizona', 'USC']),
    createSchool('Baylor', 'https://a.espncdn.com/i/teamlogos/ncaa/500/239.png', 'Big 12', 'Waco', 'Texas', ['#1C3A87', '#FFB81C'], 'Bears', ['TCU', 'Texas Tech', 'Texas A&M']),
    createSchool('BYU', 'https://a.espncdn.com/i/teamlogos/ncaa/500/252.png', 'Big 12', 'Provo', 'Utah', ['#002255', '#FFFFFF'], 'Cougars', ['Utah', 'Boise State']),
    createSchool('Cincinnati', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2132.png', 'Big 12', 'Cincinnati', 'Ohio', ['#E00122', '#000000'], 'Bearcats', ['Miami (OH)', 'Louisville']),
    createSchool('Colorado', 'https://a.espncdn.com/i/teamlogos/ncaa/500/38.png', 'Big 12', 'Boulder', 'Colorado', ['#CFB87C', '#000000'], 'Buffaloes', ['Nebraska', 'Utah', 'Colorado State']),
    createSchool('Houston', 'https://a.espncdn.com/i/teamlogos/ncaa/500/248.png', 'Big 12', 'Houston', 'Texas', ['#C8102E', '#FFFFFF'], 'Cougars', ['Rice', 'SMU']),
    createSchool('Iowa State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/66.png', 'Big 12', 'Ames', 'Iowa', ['#C8102E', '#F1BE48'], 'Cyclones', ['Iowa', 'Kansas State']),
    createSchool('Kansas', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2305.png', 'Big 12', 'Lawrence', 'Kansas', ['#0051BA', '#E31837'], 'Jayhawks', ['Kansas State', 'Missouri']),
    createSchool('Kansas State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2306.png', 'Big 12', 'Manhattan', 'Kansas', ['#512888', '#FFFFFF'], 'Wildcats', ['Kansas', 'Iowa State']),
    createSchool('Oklahoma State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/197.png', 'Big 12', 'Stillwater', 'Oklahoma', ['#FF6600', '#000000'], 'Cowboys', ['Oklahoma', 'Texas Tech']),
    createSchool('TCU', 'https://a.espncdn.com/i/teamlogos/ncaa/500/262.png', 'Big 12', 'Fort Worth', 'Texas', ['#4D1979', '#FFFFFF'], 'Horned Frogs', ['Baylor', 'SMU']),
    createSchool('Texas Tech', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2641.png', 'Big 12', 'Lubbock', 'Texas', ['#CC0000', '#000000'], 'Red Raiders', ['Texas', 'Baylor', 'Texas A&M']),
    createSchool('UCF', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2116.png', 'Big 12', 'Orlando', 'Florida', ['#000000', '#FFC904'], 'Knights', ['USF', 'East Carolina']),
    createSchool('Utah', 'https://a.espncdn.com/i/teamlogos/ncaa/500/254.png', 'Big 12', 'Salt Lake City', 'Utah', ['#CC0000', '#FFFFFF'], 'Utes', ['BYU', 'Colorado']),
    createSchool('West Virginia', 'https://a.espncdn.com/i/teamlogos/ncaa/500/277.png', 'Big 12', 'Morgantown', 'West Virginia', ['#003087', '#EAAA00'], 'Mountaineers', ['Pitt', 'Maryland']),

    // ACC
    createSchool('Boston College', 'https://a.espncdn.com/i/teamlogos/ncaa/500/103.png', 'ACC', 'Chestnut Hill', 'Massachusetts', ['#8B0000', '#A39161'], 'Eagles', ['Notre Dame', 'Syracuse']),
    createSchool('Clemson', 'https://a.espncdn.com/i/teamlogos/ncaa/500/228.png', 'ACC', 'Clemson', 'South Carolina', ['#F56600', '#522D80'], 'Tigers', ['South Carolina', 'Florida State', 'Georgia Tech']),
    createSchool('Duke', 'https://a.espncdn.com/i/teamlogos/ncaa/500/150.png', 'ACC', 'Durham', 'North Carolina', ['#003087', '#FFFFFF'], 'Blue Devils', ['North Carolina', 'NC State', 'Wake Forest']),
    createSchool('Florida State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/52.png', 'ACC', 'Tallahassee', 'Florida', ['#782F40', '#CEB888'], 'Seminoles', ['Florida', 'Miami', 'Clemson']),
    createSchool('Georgia Tech', 'https://a.espncdn.com/i/teamlogos/ncaa/500/59.png', 'ACC', 'Atlanta', 'Georgia', ['#003A70', '#B3A369'], 'Yellow Jackets', ['Georgia', 'Clemson', 'Duke']),
    createSchool('Louisville', 'https://a.espncdn.com/i/teamlogos/ncaa/500/97.png', 'ACC', 'Louisville', 'Kentucky', ['#AD0000', '#000000'], 'Cardinals', ['Kentucky', 'Cincinnati']),
    createSchool('Miami', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2390.png', 'ACC', 'Coral Gables', 'Florida', ['#005030', '#F47321'], 'Hurricanes', ['Florida State', 'Florida', 'Notre Dame']),
    createSchool('NC State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/152.png', 'ACC', 'Raleigh', 'North Carolina', ['#CC0000', '#FFFFFF'], 'Wolfpack', ['North Carolina', 'Wake Forest', 'Duke']),
    createSchool('North Carolina', 'https://a.espncdn.com/i/teamlogos/ncaa/500/153.png', 'ACC', 'Chapel Hill', 'North Carolina', ['#7BAFD4', '#FFFFFF'], 'Tar Heels', ['Duke', 'NC State', 'Wake Forest']),
    createSchool('Pitt', 'https://a.espncdn.com/i/teamlogos/ncaa/500/221.png', 'ACC', 'Pittsburgh', 'Pennsylvania', ['#003087', '#FFB612'], 'Panthers', ['West Virginia', 'Penn State', 'Notre Dame']),
    createSchool('SMU', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2567.png', 'ACC', 'Dallas', 'Texas', ['#C8102E', '#FFFFFF'], 'Mustangs', ['TCU', 'Rice']),
    createSchool('Stanford', 'https://a.espncdn.com/i/teamlogos/ncaa/500/24.png', 'ACC', 'Stanford', 'California', ['#8C1515', '#FFFFFF'], 'Cardinal', ['California', 'USC', 'Notre Dame']),
    createSchool('Syracuse', 'https://a.espncdn.com/i/teamlogos/ncaa/500/183.png', 'ACC', 'Syracuse', 'New York', ['#D44500', '#FFFFFF'], 'Orange', ['Georgetown', 'Boston College']),
    createSchool('California', 'https://a.espncdn.com/i/teamlogos/ncaa/500/25.png', 'ACC', 'Berkeley', 'California', ['#003262', '#FDB515'], 'Golden Bears', ['Stanford', 'USC']),
    createSchool('Virginia', 'https://a.espncdn.com/i/teamlogos/ncaa/500/258.png', 'ACC', 'Charlottesville', 'Virginia', ['#232D4B', '#E57200'], 'Cavaliers', ['Virginia Tech', 'Maryland']),
    createSchool('Virginia Tech', 'https://a.espncdn.com/i/teamlogos/ncaa/500/259.png', 'ACC', 'Blacksburg', 'Virginia', ['#630031', '#FF6600'], 'Hokies', ['Virginia', 'West Virginia']),
    createSchool('Wake Forest', 'https://a.espncdn.com/i/teamlogos/ncaa/500/154.png', 'ACC', 'Winston-Salem', 'North Carolina', ['#9E7E38', '#000000'], 'Demon Deacons', ['Duke', 'NC State', 'North Carolina']),

    // Pac-12
    createSchool('Oregon State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/204.png', 'Pac-12', 'Corvallis', 'Oregon', ['#DC4405', '#000000'], 'Beavers', ['Oregon']),
    createSchool('Washington State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/265.png', 'Pac-12', 'Pullman', 'Washington', ['#981E32', '#FFFFFF'], 'Cougars', ['Washington', 'Idaho']),

    // AAC
    createSchool('Charlotte', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2429.png', 'AAC', 'Charlotte', 'North Carolina', ['#006747', '#FFFFFF'], '49ers', ['Appalachian State']),
    createSchool('East Carolina', 'https://a.espncdn.com/i/teamlogos/ncaa/500/151.png', 'AAC', 'Greenville', 'North Carolina', ['#592A8A', '#FDB913'], 'Pirates', ['NC State', 'Marshall']),
    createSchool('FAU', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2226.png', 'AAC', 'Boca Raton', 'Florida', ['#003087', '#E03A3E'], 'Owls', ['FIU']),
    createSchool('FIU', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2229.png', 'AAC', 'Miami', 'Florida', ['#001C58', '#C8102E'], 'Panthers', ['FAU']),
    createSchool('Memphis', 'https://a.espncdn.com/i/teamlogos/ncaa/500/235.png', 'AAC', 'Memphis', 'Tennessee', ['#001C58', '#8B7355'], 'Tigers', ['Tennessee']),
    createSchool('North Texas', 'https://a.espncdn.com/i/teamlogos/ncaa/500/249.png', 'AAC', 'Denton', 'Texas', ['#00853D', '#FFFFFF'], 'Mean Green', ['SMU']),
    createSchool('Rice', 'https://a.espncdn.com/i/teamlogos/ncaa/500/242.png', 'AAC', 'Houston', 'Texas', ['#003D7D', '#FFFFFF'], 'Owls', ['Houston']),
    createSchool('Temple', 'https://a.espncdn.com/i/teamlogos/ncaa/500/218.png', 'AAC', 'Philadelphia', 'Pennsylvania', ['#A41E35', '#FFFFFF'], 'Owls', ['Penn State']),
    createSchool('Tulane', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2655.png', 'AAC', 'New Orleans', 'Louisiana', ['#006747', '#00A3E0'], 'Green Wave', ['LSU']),
    createSchool('Tulsa', 'https://a.espncdn.com/i/teamlogos/ncaa/500/202.png', 'AAC', 'Tulsa', 'Oklahoma', ['#0033A0', '#FFD100'], 'Golden Hurricane', ['Oklahoma State']),
    createSchool('UTSA', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2636.png', 'AAC', 'San Antonio', 'Texas', ['#003087', '#F77F00'], 'Roadrunners', ['Texas State']),

    // C-USA
    createSchool('Delaware', 'https://a.espncdn.com/i/teamlogos/ncaa/500/300.png', 'C-USA', 'Newark', 'Delaware', ['#00539B', '#FFD100'], 'Fightin\' Blue Hens', []),
    createSchool('Jacksonville State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/3.png', 'C-USA', 'Jacksonville', 'Alabama', ['#C41E3A', '#000000'], 'Gamecocks', []),
    createSchool('Kennesaw State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2305.png', 'C-USA', 'Kennesaw', 'Georgia', ['#FDB913', '#000000'], 'Owls', []),
    createSchool('Louisiana Tech', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2348.png', 'C-USA', 'Ruston', 'Louisiana', ['#E31937', '#001F5C'], 'Bulldogs', ['UL Monroe', 'Louisiana']),
    createSchool('Middle Tennessee', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2393.png', 'C-USA', 'Murfreesboro', 'Tennessee', ['#0066CC', '#FFFFFF'], 'Blue Raiders', ['Western Kentucky']),
    createSchool('New Mexico State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/166.png', 'C-USA', 'Las Cruces', 'New Mexico', ['#8C1D40', '#FFFFFF'], 'Aggies', ['New Mexico', 'UTEP']),
    createSchool('Sam Houston', 'https://a.espncdn.com/i/teamlogos/ncaa/500/328.png', 'C-USA', 'Huntsville', 'Texas', ['#FF6600', '#000000'], 'Bearkats', ['Stephen F. Austin']),
    createSchool('UTEP', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2638.png', 'C-USA', 'El Paso', 'Texas', ['#FF6600', '#1F4788'], 'Miners', ['New Mexico State']),
    createSchool('Western Kentucky', 'https://a.espncdn.com/i/teamlogos/ncaa/500/98.png', 'C-USA', 'Bowling Green', 'Kentucky', ['#E31937', '#000000'], 'Hilltoppers', ['Middle Tennessee']),

    // MAC
    createSchool('Akron', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2006.png', 'MAC', 'Akron', 'Ohio', ['#041E42', '#FFB612'], 'Zips', ['Kent State']),
    createSchool('Ball State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2050.png', 'MAC', 'Muncie', 'Indiana', ['#CC0000', '#FFFFFF'], 'Cardinals', ['Northern Illinois']),
    createSchool('Bowling Green', 'https://a.espncdn.com/i/teamlogos/ncaa/500/189.png', 'MAC', 'Bowling Green', 'Ohio', ['#470A68', '#FFB612'], 'Falcons', ['Toledo']),
    createSchool('Buffalo', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2084.png', 'MAC', 'Buffalo', 'New York', ['#003087', '#FFFFFF'], 'Bulls', ['Miami (OH)']),
    createSchool('Central Michigan', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2117.png', 'MAC', 'Mount Pleasant', 'Michigan', ['#6A0032', '#FFFFFF'], 'Chippewas', ['Western Michigan', 'Eastern Michigan']),
    createSchool('Eastern Michigan', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2199.png', 'MAC', 'Ypsilanti', 'Michigan', ['#046A38', '#FFFFFF'], 'Eagles', ['Central Michigan', 'Western Michigan']),
    createSchool('Kent State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2309.png', 'MAC', 'Kent', 'Ohio', ['#003087', '#FFB612'], 'Golden Flashes', ['Akron']),
    createSchool('Miami (OH)', 'https://a.espncdn.com/i/teamlogos/ncaa/500/193.png', 'MAC', 'Oxford', 'Ohio', ['#C41230', '#FFFFFF'], 'RedHawks', ['Cincinnati', 'Ohio']),
    createSchool('Northern Illinois', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2459.png', 'MAC', 'DeKalb', 'Illinois', ['#C41E3A', '#FFFFFF'], 'Huskies', ['Ball State', 'Western Michigan']),
    createSchool('Ohio', 'https://a.espncdn.com/i/teamlogos/ncaa/500/195.png', 'MAC', 'Athens', 'Ohio', ['#003366', '#FFFFFF'], 'Bobcats', ['Miami (OH)', 'Marshall']),
    createSchool('Toledo', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2649.png', 'MAC', 'Toledo', 'Ohio', ['#003E7E', '#FFD700'], 'Rockets', ['Bowling Green']),
    createSchool('Western Michigan', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2711.png', 'MAC', 'Kalamazoo', 'Michigan', ['#672146', '#FFFFFF'], 'Broncos', ['Central Michigan', 'Eastern Michigan']),

    // Mountain West
    createSchool('Air Force', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2006.png', 'Mountain West', 'Colorado Springs', 'Colorado', ['#0032A0', '#FFFFFF'], 'Falcons', ['Army', 'Navy']),
    createSchool('Boise State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/68.png', 'Mountain West', 'Boise', 'Idaho', ['#09347A', '#0033A0'], 'Broncos', ['Idaho', 'BYU']),
    createSchool('Colorado State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/36.png', 'Mountain West', 'Fort Collins', 'Colorado', ['#1E4D72', '#FFD700'], 'Rams', ['Colorado', 'Wyoming']),
    createSchool('Fresno State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/278.png', 'Mountain West', 'Fresno', 'California', ['#C41230', '#003087'], 'Bulldogs', ['San Diego State']),
    createSchool('Hawaii', 'https://a.espncdn.com/i/teamlogos/ncaa/500/62.png', 'Mountain West', 'Honolulu', 'Hawaii', ['#006644', '#FFFFFF'], 'Rainbow Warriors', []),
    createSchool('Nevada', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2440.png', 'Mountain West', 'Reno', 'Nevada', ['#003E7E', '#FFFFFF'], 'Wolf Pack', ['UNLV']),
    createSchool('New Mexico', 'https://a.espncdn.com/i/teamlogos/ncaa/500/167.png', 'Mountain West', 'Albuquerque', 'New Mexico', ['#BA0C2F', '#FFD100'], 'Lobos', ['New Mexico State']),
    createSchool('San Diego State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/21.png', 'Mountain West', 'San Diego', 'California', ['#BF2C37', '#FFFFFF'], 'Aztecs', ['Fresno State', 'UNLV']),
    createSchool('San Jose State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/23.png', 'Mountain West', 'San Jose', 'California', ['#0055A4', '#FFFFFF'], 'Spartans', ['Fresno State']),
    createSchool('UNLV', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2439.png', 'Mountain West', 'Las Vegas', 'Nevada', ['#C41230', '#000000'], 'Rebels', ['Nevada', 'San Diego State']),
    createSchool('Utah State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/328.png', 'Mountain West', 'Logan', 'Utah', ['#003E7E', '#FFFFFF'], 'Aggies', ['BYU', 'Utah']),
    createSchool('Wyoming', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2751.png', 'Mountain West', 'Laramie', 'Wyoming', ['#6F263D', '#FFD100'], 'Cowboys', ['Colorado State']),

    // Sun Belt
    createSchool('Appalachian State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2026.png', 'Sun Belt', 'Boone', 'North Carolina', ['#FFCC00', '#000000'], 'Mountaineers', ['Georgia Southern']),
    createSchool('Arkansas State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2032.png', 'Sun Belt', 'Jonesboro', 'Arkansas', ['#E31837', '#000000'], 'Red Wolves', []),
    createSchool('Coastal Carolina', 'https://a.espncdn.com/i/teamlogos/ncaa/500/324.png', 'Sun Belt', 'Conway', 'South Carolina', ['#1BA5D8', '#007A3D'], 'Chanticleers', []),
    createSchool('Georgia Southern', 'https://a.espncdn.com/i/teamlogos/ncaa/500/290.png', 'Sun Belt', 'Statesboro', 'Georgia', ['#003E7E', '#F0AB00'], 'Eagles', ['Appalachian State', 'Georgia State']),
    createSchool('Georgia State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2247.png', 'Sun Belt', 'Atlanta', 'Georgia', ['#003E7E', '#E31837'], 'Panthers', ['Georgia Southern']),
    createSchool('James Madison', 'https://a.espncdn.com/i/teamlogos/ncaa/500/256.png', 'Sun Belt', 'Harrisonburg', 'Virginia', ['#46166B', '#FFCC00'], 'Dukes', ['Old Dominion']),
    createSchool('Louisiana', 'https://a.espncdn.com/i/teamlogos/ncaa/500/309.png', 'Sun Belt', 'Lafayette', 'Louisiana', ['#E31837', '#FFFFFF'], 'Ragin\' Cajuns', ['Louisiana Tech', 'UL Monroe']),
    createSchool('Marshall', 'https://a.espncdn.com/i/teamlogos/ncaa/500/276.png', 'Sun Belt', 'Huntington', 'West Virginia', ['#006633', '#FFFFFF'], 'Thundering Herd', ['East Carolina', 'Ohio']),
    createSchool('Old Dominion', 'https://a.espncdn.com/i/teamlogos/ncaa/500/295.png', 'Sun Belt', 'Norfolk', 'Virginia', ['#003087', '#FFFFFF'], 'Monarchs', ['James Madison', 'William & Mary']),
    createSchool('South Alabama', 'https://a.espncdn.com/i/teamlogos/ncaa/500/6.png', 'Sun Belt', 'Mobile', 'Alabama', ['#003E7E', '#E31837'], 'Jaguars', ['Troy']),
    createSchool('Southern Miss', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2572.png', 'Sun Belt', 'Hattiesburg', 'Mississippi', ['#FFCC00', '#000000'], 'Golden Eagles', ['UL Monroe']),
    createSchool('Texas State', 'https://a.espncdn.com/i/teamlogos/ncaa/500/326.png', 'Sun Belt', 'San Marcos', 'Texas', ['#5C0025', '#FFFFFF'], 'Bobcats', ['UTSA']),
    createSchool('Troy', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2653.png', 'Sun Belt', 'Troy', 'Alabama', ['#8B0000', '#FFFFFF'], 'Trojans', ['South Alabama']),
    createSchool('UL Monroe', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2433.png', 'Sun Belt', 'Monroe', 'Louisiana', ['#E31837', '#FFD100'], 'Warhawks', ['Louisiana Tech', 'Louisiana']),

    // Independent
    createSchool('Army', 'https://a.espncdn.com/i/teamlogos/ncaa/500/349.png', 'Independent', 'West Point', 'New York', ['#000000', '#FFD100'], 'Black Knights', ['Navy', 'Air Force']),
    createSchool('Connecticut', 'https://a.espncdn.com/i/teamlogos/ncaa/500/41.png', 'Independent', 'Storrs', 'Connecticut', ['#000E2F', '#FFFFFF'], 'Huskies', ['Rutgers']),
    createSchool('Liberty', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2335.png', 'Independent', 'Lynchburg', 'Virginia', ['#002D62', '#FFFFFF'], 'Flames', []),
    createSchool('Navy', 'https://a.espncdn.com/i/teamlogos/ncaa/500/2426.png', 'Independent', 'Annapolis', 'Maryland', ['#001F5C', '#FFD100'], 'Midshipmen', ['Army', 'Air Force', 'Notre Dame']),
    createSchool('Notre Dame', 'https://a.espncdn.com/i/teamlogos/ncaa/500/87.png', 'Independent', 'Notre Dame', 'Indiana', ['#0C2340', '#C99700'], 'Fighting Irish', ['USC', 'Michigan', 'Michigan State', 'Purdue', 'Stanford', 'Navy']),
    createSchool('UMass', 'https://a.espncdn.com/i/teamlogos/ncaa/500/113.png', 'Independent', 'Amherst', 'Massachusetts', ['#881C1C', '#FFFFFF'], 'Minutemen', ['Connecticut']),
];

const seedSchools = async () => {
    try {
        // Connect to database
        await connectDB();

        console.log('🌱 Starting to seed schools...');

        // Clear existing schools (optional - comment out if you want to keep existing data)
        const deleted = await School.deleteMany({});
        console.log(`🗑️  Deleted ${deleted.deletedCount} existing schools`);

        // Insert schools
        const schools = await School.insertMany(
            schoolsData.map((school) => ({
                name: school.name,
                icon: school.logo,
                conference: school.conference,
                city: school.city,
                state: school.state,
                colors: school.colors,
                mascot: school.mascot,
                rivals: school.rivals,
                isActive: true,
            }))
        );

        console.log(`✅ Successfully seeded ${schools.length} schools!`);
        console.log('\n📊 Schools by conference:');

        // Group by conference and display counts
        const byConference = schools.reduce((acc, school) => {
            acc[school.conference] = (acc[school.conference] || 0) + 1;
            return acc;
        }, {});

        Object.entries(byConference)
            .sort((a, b) => b[1] - a[1])
            .forEach(([conference, count]) => {
                console.log(`   ${conference}: ${count} schools`);
            });

        // Close database connection
        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding schools:', error);
        // Close database connection on error
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
        process.exit(1);
    }
};

// Run the seed function
seedSchools();
