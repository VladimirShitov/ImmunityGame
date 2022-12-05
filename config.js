// Game texts
var language = "eng";
var contacts = {
    dmitryBiba: "dmitriy.biba@gmail.com",
    vladimirShitov: "vladimirshitov98@gmail.com",
    anastasiaTroshina: "buccinum@gmail.com"
}
var texts = {
    menu: {
        startGame: {eng: "Start game", rus: "Начать игру"},
        tutorial: {eng: "Tutorial", rus: "Обучение"},
        about: {eng: "About", rus: "Об игре"},
        back: {eng: "Back", rus: "Назад"},
        testerTeam: {eng: "Tester team", rus: "Тестировщики"},
        testerList: {eng: ["Andrey Biba", "Olesya Biba", "Roman Soldatov"], rus: ["Андрей Биба", "Олеся Биба", "Роман Солдатов"]},
        authorInfo: {eng: ["Design by ", "BioMolText 2022"], 
                     rus: ["Дизайн от ", "Био/Мол/Текст-2022"]},
        contacts: {eng: "Contacts", rus:"Контакты"},
        dmitryBiba: {eng: "Dmitry Biba", rus: "Дмитрий Биба"},
        vladimirShitov: {eng: "Vladimir Shitov", rus: "Владимир Шитов"},
        anastasiaTroshina: {eng: "Anastasia Troshina", rus: "Анастасия Трошина"}
        
    },
    game:{
        speed: {eng: "Speed", rus: "Скорость"},
        antibiotics: {eng: "Antibiotics", rus: "Антибиотики"},
        vaccines: {eng: "Vaccines", rus: "Вакцины"},
        art: {eng: "A.R.T.", rus: "А.Р.Т."},
        viruses: {eng: "Viruses", rus: "Вирусы"},
        bacteria: {eng: "Bacteria", rus: "Бактерии"},
        other: {eng: "Other", rus: "Все остальное"},
        infectedTissueCells: {eng: "Infected tissue cells", rus: "Зараженные вирусом клетки"},
        helminthes: {eng: "Helminthes", rus: "Гельминты"}
    },
    gameOverScreen: {
        immuneCellsBought: {eng: "Immune cells bought", rus: "Куплено имм. клеток"},
        boostersBought: {eng: "Boosters bought", rus: "Куплено бустеров"},
        enemiesBought: {eng: "Pathogens killed", rus: "Убито патогенов"},
        sugar: {eng: "Glucose", rus: "Глюкоза"},
        currentWave: {eng: "Current wave", rus: "Текущая волна"},
    },
    cellNames: {
        Neutrophil: {eng:"Neutrophil", rus: "Нейтрофил"},
        Macrophage: {eng:"Margophage", rus: "Макрофаг"},
        Eosinophile: {eng:"Eosinophil", rus: "Эозинофил"},
        NaturalKiller: {eng:"NK cell", rus: "НК клетка"},
        BLymphocyte: {eng:"B cell", rus: "Б клетка"},
        PlasmaticCell: {eng:"Plasmatic cell", rus: "Плазматич. клетка"},
        BMemory: {eng: "Memory B cell", rus: "Б клетка памяти"},
        TLymphocyte: {eng:"T Killer", rus: "Т киллер"},
        TMemory: {eng: "Memory T cell", rus: "Т клетка памяти"},
        THelper: {eng:"T Helper", rus: "Т хелпер"}
    }

}    

// Game parameters
var livesLeft = 10;
var STARTING_MONEY = 0;
var chanceToGetAntigen = 0.02;
var baseIncome = 0.01;

// Field parameters
const field = document.getElementById("field");
var ctx = field.getContext("2d");

const WIDTH_HEIGHT_RATIO = 1440 / 1068;
ctx.width = Math.round(field.width * WIDTH_HEIGHT_RATIO);

const fieldWidth = field.width;
const fieldHeight = field.height;


// Main menu
const MAIN_MENU_RIGHT_PANEL_COLOR = "#2C363E";
const MAIN_MENU_LEFT_PANEL_COLOR = "#FAF6ED";
const MAIN_MENU_BUTTONS_X =  1012 / 1440 * fieldWidth;
const MAIN_MENU_BUTTONS_Y =  0.172 * fieldHeight;
const MAIN_MENU_BUTTONS_WIDTH = 300 / 1440 * fieldWidth;
const MAIN_MENU_BUTTONS_HEIGHT = 100 / 1068 * fieldHeight;
const SPACE_BETWEEN_MAIN_MENU_BUTTONS = 50 / 1068 * fieldHeight;
const COVER_IMAGE = new Image();
COVER_IMAGE.src = "./images/coverImage.png";
// Playable field
const playableFieldX = 0.0208*fieldWidth;
const playableFieldY = 0.4*fieldHeight;
const playableFieldHeight = 0.533*fieldHeight;
const playableFieldWidth = 0.86*fieldWidth;
const playableFieldBorderColor = "#422D0D"
const tissueCellsLeftOffset = 0.007263922*playableFieldWidth;
const tissueCellsUpOffset = 0.017452*playableFieldHeight;

const TUTORIAL_WINDOW_WIDTH = 500 / 1440 * fieldWidth;
const TUTORIAL_WINDOW_HEIGHT = 250 / 1068 * fieldHeight;
const TUTORIAL_WINDOW_Y_OFFSET = 100 / 1068 * fieldHeight;
const TUTORIAL_WINDOW_TEXT_OFFSET = 30 / 1440 * fieldWidth;
const TUTORIAL_WINDOW_LINE_HEIGHT = 25 / 1068 * fieldHeight;
const TUTORIAL_WINDOW_OK_X_OFFSET = 60 / 1440 * fieldWidth;
const TUTORIAL_WINDOW_OK_Y_OFFSET = 47 / 1068 * fieldHeight;
const TUTORIAL_WINDOW_BUTTON_X_OFFSET = 70 / 1440 * fieldWidth;
const TUTORIAL_WINDOW_BUTTON_Y_OFFSET = 70 / 1068 * fieldHeight;


// Top menu
const topMenuColor = "#142029";
const topMenuHeight = fieldHeight*0.075;

const LIFES_IMAGE = new Image();
LIFES_IMAGE.src = "./images/lifes.png";
const LIFES_IMAGE_PALE = new Image();
LIFES_IMAGE_PALE.src = "./images/lifes_pale.png";
const lifeImages = {
    bright: LIFES_IMAGE,
    pale: LIFES_IMAGE_PALE
}

const lifesSize = topMenuHeight*0.6;

const HOME_IMAGE = new Image();
HOME_IMAGE.src = "./images/home.png";
const homeHeight = topMenuHeight*0.5;
const RESET_IMAGE = new Image();
RESET_IMAGE.src = "./images/restart.png";


const WAVE_IMAGE = new Image();
WAVE_IMAGE.src = "./images/wave.png";
const wavesBackColor = "#E8D9B4";
const wavesFillingColor = "#D3B97F";
const wavesRectangleX = fieldWidth*0.11875;
const wavesRectangleY = topMenuHeight*0.25;
const wavesRectangleWidth = fieldWidth*0.0970;
const wavesRectangleHeight = topMenuHeight*0.5;

const MONEY_IMAGE = new Image();
MONEY_IMAGE.src = "./images/sugar.png";
const moneyRectangleColor = "#E8D9B4";
const moneyRectangleX = 0.276*fieldWidth;
const moneyRectangleY = wavesRectangleY;
const moneyRectangleWidth = wavesRectangleWidth;
const moneyRectangleHeight = wavesRectangleHeight;

// Speed
const SPEED_UP_IMAGE = new Image();
SPEED_UP_IMAGE.src = "./images/speed_up.png";
const SPEED_DOWN_IMAGE = new Image();
SPEED_DOWN_IMAGE.src = "./images/speed_down.png";
const speedRectangleColor = "#E8D9B4";
const speedRectangleX = 0.456*fieldWidth;
const speedRectangleY = wavesRectangleY;
let speedRectangleWidth = wavesRectangleWidth;
const speedRectangleHeight = wavesRectangleHeight;
var BASE_GAME_SPEED = 1;

const PAUSE_IMAGE = new Image();
PAUSE_IMAGE.src = "./images/pause.png";
const RESUME_IMAGE = new Image();
RESUME_IMAGE.src = "./images/resume.png";

// Right menu
const rightMenuColor = "#2C363E";
const rightMenuX = 0.9*fieldWidth;
const rightMenuWidth = 0.076388*fieldWidth;

// Antibiotics & vaccines
const FIRST_ANTIBIOTIC_ACTIVE = new Image();
FIRST_ANTIBIOTIC_ACTIVE.src = "./images/antibiotic_button_first_active.png";
const SECOND_ANTIBIOTIC_ACTIVE = new Image();
SECOND_ANTIBIOTIC_ACTIVE.src = "./images/antibiotic_button_second_active.png";
const THIRD_ANTIBIOTIC_ACTIVE = new Image();
THIRD_ANTIBIOTIC_ACTIVE.src = "./images/antibiotic_button_third_active.png";
const FOURTH_ANTIBIOTIC_ACTIVE = new Image();
FOURTH_ANTIBIOTIC_ACTIVE.src = "./images/antibiotic_button_fourth_active.png";
const FIRST_ANTIBIOTIC_INACTIVE = new Image();
FIRST_ANTIBIOTIC_INACTIVE.src = "./images/antibiotic_button_first_inactive.png";
const SECOND_ANTIBIOTIC_INACTIVE = new Image();
SECOND_ANTIBIOTIC_INACTIVE.src = "./images/antibiotic_button_second_inactive.png";
const THIRD_ANTIBIOTIC_INACTIVE = new Image();
THIRD_ANTIBIOTIC_INACTIVE.src = "./images/antibiotic_button_third_inactive.png";
const FOURTH_ANTIBIOTIC_INACTIVE = new Image();
FOURTH_ANTIBIOTIC_INACTIVE.src = "./images/antibiotic_button_fourth_inactive.png";
const MONEY_RIGHT_PANEL_IMAGE = new Image();
MONEY_RIGHT_PANEL_IMAGE.src = "./images/sugar_right_menu.png";
const RESISTANCE_IMAGE = new Image();
RESISTANCE_IMAGE.src = "./images/resistence.png";
const buttonWidth = 0.02777*fieldHeight;
const buttonHeight = 0.02777*fieldHeight;
const antibioticsX = rightMenuX + rightMenuWidth/2 - buttonWidth/2 + rightMenuWidth*0.1;
const antibioticBarWidth = 0.0727*rightMenuWidth;
const distanceBetweenAntibioticButtonAndBar = 0.03636*rightMenuWidth;
const topAntibioticY = 0.17*fieldHeight;
const spaceBetweenAntibioticButtons = 0.01667*fieldHeight;
const topVaccineY = 0.52*fieldHeight;
var ANTIBIOTIC_COURSE_LENGTH = 4;
var nVaccinate = 30;

// ART
const ART_IMAGE = new Image();
ART_IMAGE.src = "./images/ART.png";
const ART_ACTIVE_IMAGE = new Image();
ART_ACTIVE_IMAGE.src = "./images/ART_active.png";
const ARTY = 0.82*fieldHeight;
const ART_PRICE = 30;
const ART_SLOWING_COEFFICIENT = 0.2;
var ART_DURATION = 20000;

// Blood
const BLOOD_IMAGE_1 = new Image();
BLOOD_IMAGE_1.src = "./images/blood/BloodVessel1.png";
const BLOOD_IMAGE_1_PALE = new Image();
BLOOD_IMAGE_1_PALE.src = "./images/blood/BloodVessel1_pale.png";

const BLOOD_IMAGE_2 = new Image();
BLOOD_IMAGE_2.src = "./images/blood/BloodVessel2.png";
const BLOOD_IMAGE_2_PALE = new Image();
BLOOD_IMAGE_2_PALE.src = "./images/blood/BloodVessel2_pale.png";

const BLOOD_IMAGE_3 = new Image();
BLOOD_IMAGE_3.src = "./images/blood/BloodVessel3.png";
const BLOOD_IMAGE_3_PALE = new Image();
BLOOD_IMAGE_3_PALE.src = "./images/blood/BloodVessel3_pale.png";

const BLOOD_IMAGE_4 = new Image();
BLOOD_IMAGE_4.src = "./images/blood/BloodVessel4.png";
const BLOOD_IMAGE_4_PALE = new Image();
BLOOD_IMAGE_4_PALE.src = "./images/blood/BloodVessel4_pale.png";

const BLOOD_IMAGE_5 = new Image();
BLOOD_IMAGE_5.src = "./images/blood/BloodVessel5.png";
const BLOOD_IMAGE_5_PALE = new Image();
BLOOD_IMAGE_5_PALE.src = "./images/blood/BloodVessel5_pale.png";

const BLOOD_IMAGE_6 = new Image();
BLOOD_IMAGE_6.src = "./images/blood/BloodVessel6.png";
const BLOOD_IMAGE_6_PALE = new Image();
BLOOD_IMAGE_6_PALE.src = "./images/blood/BloodVessel6_pale.png";

const BLOOD_IMAGE_7 = new Image();
BLOOD_IMAGE_7.src = "./images/blood/BloodVessel7.png";
const BLOOD_IMAGE_7_PALE = new Image();
BLOOD_IMAGE_7_PALE.src = "./images/blood/BloodVessel7_pale.png";

const BLOOD_IMAGE_8 = new Image();
BLOOD_IMAGE_8.src = "./images/blood/BloodVessel8.png";
const BLOOD_IMAGE_8_PALE = new Image();
BLOOD_IMAGE_8_PALE.src = "./images/blood/BloodVessel8_pale.png";

const blood = {
    1: {bright: BLOOD_IMAGE_1,
        pale: BLOOD_IMAGE_1_PALE}, 
    2: {bright: BLOOD_IMAGE_2,
        pale: BLOOD_IMAGE_2_PALE},
    3: {bright: BLOOD_IMAGE_3,
        pale: BLOOD_IMAGE_3_PALE},
    4: {bright: BLOOD_IMAGE_4,
        pale: BLOOD_IMAGE_4_PALE},
    5: {bright: BLOOD_IMAGE_5,
        pale: BLOOD_IMAGE_5_PALE},
    6: {bright: BLOOD_IMAGE_6,
        pale: BLOOD_IMAGE_6_PALE},
    7: {bright: BLOOD_IMAGE_7,
        pale: BLOOD_IMAGE_7_PALE},
    8: {bright: BLOOD_IMAGE_8,
        pale: BLOOD_IMAGE_8_PALE}
}
// Spleen
const spleenTrunkX = 0.706*fieldWidth;
const spleenTrunkWidth = 0.1743*fieldWidth;
const bloodColor = {
    bright: "#CF0000",
    pale: "#E67E7C"
}
const spleenX = 0.734*fieldWidth;
const spleenY = 0.1389*fieldHeight;
const spleenSize = 0.11944*fieldWidth;
const spleenColor = "#E78080"



// Shops


const THELPER_SHOP = new Image();
THELPER_SHOP.src = "./images/Thelper_shop.png";
const MACROPHAGE_SHOP = new Image();
MACROPHAGE_SHOP.src = "./images/Macrophage_shop.png";
const EOSINOPHIL_SHOP = new Image();
EOSINOPHIL_SHOP.src = "./images/Eosinophil_shop.png";
const TKILLER_SHOP_IMAGE = new Image();
TKILLER_SHOP_IMAGE.src = "./images/TKiller_shop.png";
const NK_SHOP = new Image();
NK_SHOP.src = "./images/NK_shop.png";
const BLYMPHOCYTE_SHOP_IMAGE = new Image();
BLYMPHOCYTE_SHOP_IMAGE .src = "./images/BLymphocyte_shop.png";
const NEUTROPHIL_SHOP = new Image();
NEUTROPHIL_SHOP.src = "./images/Neutrophil_shop.png";



const MINIMONEY = new Image();
const FIRST_POCKET_V = new Image();
FIRST_POCKET_V.src = "./images/pocket_one_v.png";
const SECOND_POCKET_V = new Image();
SECOND_POCKET_V.src = "./images/pocket_two_v.png";
const THIRD_POCKET_V = new Image();
THIRD_POCKET_V.src = "./images/pocket_three_v.png";
const FOURTH_POCKET_V = new Image();
FOURTH_POCKET_V.src = "./images/pocket_four_v.png";
const FIRST_POCKET_B = new Image();
FIRST_POCKET_B.src = "./images/pocket_one_b.png";
const SECOND_POCKET_B = new Image();
SECOND_POCKET_B.src = "./images/pocket_two_b.png";
const THIRD_POCKET_B = new Image();
THIRD_POCKET_B.src = "./images/pocket_three_b.png";
const FOURTH_POCKET_B = new Image();
FOURTH_POCKET_B.src = "./images/pocket_four_b.png";
MINIMONEY.src = "./images/minimoney.svg";
const BONE_MARROW_BACKGROUND_IMAGE = new Image();
BONE_MARROW_BACKGROUND_IMAGE.src = "./images/boneMarrow.png";
const shopY =  0.172*fieldHeight;
const shopWidth =  0.085417*fieldWidth;
const shopHeight = 0.16*fieldHeight;
const spaceBetweenShops = 0.0125*fieldWidth;
const xLeftOffset = playableFieldX;

const priceHeight = shopHeight*0.125

const wavesFillingOpacity = 0.6;

const AUTHORS_INFO = ["Dmitry Biba & Vladimir Shitov",
                      "Design by Anastasia Troshina",
                      "BioMolText 2022"];

// Tutorial
BLACK_SCREEN_ALPHA = 0.5;

// fieldwidth = 1440 
// fieldheight = 1068

const SCROLL_IMAGE = new Image();
SCROLL_IMAGE.src = "./images/scroll.png";

const LYMPHOCYTES_IMAGES = new Map();  // Map from color to image of lymphocytes
const BACTERIA_IMAGES = new Map();  // Map from color to image of bacteria

const HELMINTH_IMAGE = new Image();
HELMINTH_IMAGE.src = "./images/helminth.png";

var ShopColors = {
    blue:{
        pocketImageV: FIRST_POCKET_V,        
        colorCode: "#005FA4",
    },
    green:{
        pocketImageV: SECOND_POCKET_V,        
        colorCode: "#006956",
    },
    yellow:{
        pocketImageV: THIRD_POCKET_V,        
        colorCode: "#DC9E00",
    },
    // This one is not displayed, but prevents error when creating orange pocket
    orange:{
        pocketImageV: FOURTH_POCKET_V,                
        colorCode: "#DC9E00",
    },
}


// fieldwidth = 1440 
// fieldheight = 1068


// Animation parameters
const N_ANIMATION_FRAMES = 5;
const ANIMATED_IMAGE_WIDTH = 100;
const ANIMATED_IMAGE_HEIGHT = 100;
const STATIC_IMAGE_WIDTH = 200;
const STATIC_IMAGE_HEIGHT = 200;

const LYMPHOCYTES_DEFAULT_IMAGE = new Image();
LYMPHOCYTES_DEFAULT_IMAGE.src = "./images/lymphocyte_test.png";

const GARBAGE_IMAGE_1 = new Image();
GARBAGE_IMAGE_1.src = "./images/garbage_1.png";
const GARBAGE_IMAGE_2 = new Image();
GARBAGE_IMAGE_2.src = "./images/garbage_2.png";
const GARBAGE_IMAGE_3 = new Image();
GARBAGE_IMAGE_3.src = "./images/garbage_3.png";
const GARBAGE_IMAGES = [GARBAGE_IMAGE_1, GARBAGE_IMAGE_2, GARBAGE_IMAGE_3];
var garbagePileSlowingCoefficient = 0.4;

const PAUSE_SCREEN = new Image();
PAUSE_SCREEN.src = "./images/pause_screen.png";
const PAUSE_RECTANGLE = new Image();
PAUSE_RECTANGLE.src = "./images/pause_rectangle.png";
const pauseScreenWidth = 0.5*fieldWidth;
const pauseScreenHeight = 0.16*fieldHeight;

const GAME_OVER_FLAG = new Image();
GAME_OVER_FLAG.src = "./images/gameoverFlag.png"
const gameOverFlagX = 0.034*fieldWidth;
const gameOverFlagHeight = 0.625*fieldHeight;
const gameOverFlagWidth =  0.1647*gameOverFlagHeight;
const STATS_FLAG = new Image();
STATS_FLAG.src = "./images/statsFlag.png"
const statsFlagX = 0.133*fieldWidth;
const statsFlagHeight = 0.625*fieldHeight;
const statsFlagWidth = 0.72*statsFlagHeight;
const DIGIT_IMAGES = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
for (var i=0; i < DIGIT_IMAGES.length; i++){
    DIGIT_IMAGES[i].src = "./images/digits/" + i + ".png";
}
const digitImageWidth = fieldWidth*(75/1400);
const digitImageHeight = fieldHeight*(125/1070)
const GAME_OVER_BLUR = new Image();
GAME_OVER_BLUR.src = "./images/gameover_blur.png";


// Host cell parameters
//      Tissue cells
const CELL_IMAGES = [new Image(), new Image(), new Image(), new Image()];
for (var i=1; i < CELL_IMAGES.length+1; i++){
    CELL_IMAGES[i-1].src = "./images/Cell" + i + ".png";
}
const tissueCellSize = 0.0282558*playableFieldWidth;
const nTissueCellRows = 15;
const nTissueCellColumns = 33;
const spaceBetweenTissueCellsHorizontal = 0.00139*fieldWidth;
const spaceBetweenTissueCellsVertical = 0.003472*playableFieldHeight;
var EdgeCellX;
const tissueCellDeathRate = 0.000001;

// Immune cells
const FIRST_LYMPHOCYTE = new Image();
FIRST_LYMPHOCYTE.src = "./images/Blymphocytes_first.png";
const SECOND_LYMPHOCYTE = new Image();
SECOND_LYMPHOCYTE.src = "./images/Blymphocytes_second.png";
const THIRD_LYMPHOCYTE = new Image();
THIRD_LYMPHOCYTE.src = "./images/Blymphocytes_third.png";
const FOURTH_LYMPHOCYTE = new Image();
FOURTH_LYMPHOCYTE.src = "./images/Blymphocytes_fourth.png";
const FIRST_PLASMATIC = new Image();
FIRST_PLASMATIC.src = "./images/Plasmatic_first.png";
const SECOND_PLASMATIC = new Image();
SECOND_PLASMATIC.src = "./images/Plasmatic_second.png";
const THIRD_PLASMATIC = new Image();
THIRD_PLASMATIC.src = "./images/Plasmatic_third.png";
const FOURTH_PLASMATIC = new Image();
FOURTH_PLASMATIC.src = "./images/Plasmatic_fourth.png";
const FIRST_BMEMORY = new Image();
FIRST_BMEMORY.src = "./images/BMemory_first.png";
const SECOND_BMEMORY = new Image();
SECOND_BMEMORY.src = "./images/BMemory_second.png";
const THIRD_BMEMORY = new Image();
THIRD_BMEMORY.src = "./images/BMemory_third.png";
const FOURTH_BMEMORY = new Image();
FOURTH_BMEMORY.src = "./images/BMemory_fourth.png";

const T_LYMPHOCYTES_IMAGE = new Image();
T_LYMPHOCYTES_IMAGE.src = "./images/Tlymphocyte_image.png";
const FIRST_TLYMPHOCYTE = new Image();
FIRST_TLYMPHOCYTE.src = "./images/Tlymphocytes_first.png";
const SECOND_TLYMPHOCYTE = new Image();
SECOND_TLYMPHOCYTE.src = "./images/Tlymphocytes_second.png";
const THIRD_TLYMPHOCYTE = new Image();
THIRD_TLYMPHOCYTE.src = "./images/Tlymphocytes_third.png";
const FOURTH_TLYMPHOCYTE = new Image();
FOURTH_TLYMPHOCYTE.src = "./images/Tlymphocytes_fourth.png";
const FIRST_TMEMORY = new Image();
FIRST_TMEMORY.src = "./images/TMemory_first.png";
const SECOND_TMEMORY = new Image();
SECOND_TMEMORY.src = "./images/TMemory_second.png";
const THIRD_TMEMORY = new Image();
THIRD_TMEMORY.src = "./images/TMemory_third.png";
const FOURTH_TMEMORY = new Image();
FOURTH_TMEMORY.src = "./images/TMemory_fourth.png";



const MACROPHAGES_IMAGE = new Image();
MACROPHAGES_IMAGE.src = "./images/macrophages.png";
const NEUTROPHILS_IMAGE = new Image();
NEUTROPHILS_IMAGE.src = "./images/neutrophils.png";
const EOSINOPHILES_IMAGE = new Image();
EOSINOPHILES_IMAGE.src = "./images/eosinophiles.png";
const NK_IMAGE = new Image();
NK_IMAGE.src = "./images/NK_cells.png";
const T_HELPER_IMAGE = new Image();
T_HELPER_IMAGE.src = "./images/Thelper.png";


var BASE_IMMUNITY_CELL_LONGEVITY = 40000;

// Prices
const NK_PRICE = 15;
const T_LYMPHOCYTE_PRICE = 25;
const B_LYMPHOCYTE_PRICE = 20;
const T_HELPER_PRICE = 50;
const NEUTROPHIL_PRICE = 10;
const MACROPHAGE_PRICE = 30;
const EOSINOPHILE_PRICE = 5;
const ANTIBIOTIC_PRICE = 10;
const VACCINE_PRICE = 5;
const PLASMATIC_CELL_UPGRADE_PRICE = 10;
const MEMORY_CELL_UPGRADE_PRICE = 20;

// Speeds
var NK_SPEED = 0.5;
var TLYMPHOCYTE_SPEED = 0.5;
var NEUTROPHIL_SPEED = 0.4;
var BLYMPHOCYTE_SPEED = 0.3;
var THELPER_SPEED = 0.5;
var EOSINOPHILE_SPEED = 0.2;
var MACROPHAGE_SPEED = 0.4;

// Damages
var EOSINOPHILES_DAMAGE = 0.01;
var NEUTROPHIL_DAMAGE = 0.2;
var MACROPHAGE_DAMAGE = 1;
var NK_DAMAGE = 1;
var BLYMPHOCYTE_DAMAGE = 1;
var TLYMPHOCYTE_DAMAGE = 1;

//      Lymphocytes
const randomTargetNumber = 5;
const TlymphocyteReproductionNumber = 5;
var trainingProbability = 0.01;

// Helper
var HELPER_BUYING_COOLDOWN = 30000;
const HELPER_DISCOUNT_RATE = 1;
const HELPER_DAMAGE_INCREASE = 1.1;


const UPGRADE_PLASMATIC = new Image();
UPGRADE_PLASMATIC.src = "./images/upgrade_plasmatic.png";
const UPGRADE_MEMORY = new Image();
UPGRADE_MEMORY.src = "./images/upgrade_memory.png";

// Antibodies
ANTIBODY_LONGEVITY = 10000;
ANTIBODY_PRODUCTION_FREQUENCY = 50;
ANTIBODY_SLOWING_COEFFICIENT = 0.5;


// Upgrade
const UPGRADE_FIRST = new Image();
UPGRADE_FIRST.src = "./images/upgrade_first.png";
const UPGRADE_FIRST_SIZE = 0.022*fieldHeight;

const UPGRADE_LABEL_HEIGHT = 0.037*fieldHeight;
const UPGRADE_LABEL_WIDTH = 0.069*fieldWidth;



// Pathogen parameters
// Bacteria
const FIRST_BACTERIUM = new Image();
FIRST_BACTERIUM.src = "./images/bacteria_first.png";
const SECOND_BACTERIUM = new Image();
SECOND_BACTERIUM.src = "./images/bacteria_second.png";
const THIRD_BACTERIUM = new Image();
THIRD_BACTERIUM.src = "./images/bacteria_third.png";
const FOURTH_BACTERIUM = new Image();
FOURTH_BACTERIUM.src = "./images/bacteria_fourth.png";
const BACTERIA_COLORS = ["first", "second", "third", "fourth"];
const bacteriaRadius = 6;
var starting_nBacteria = 30;
var BACTERIUM_BASE_SPEED = 0.2*0.86;
var BASE_BACTERIAL_HEALTH = 200;
var bacteriaColors = {
    first:{
        colorCode: "#FD2595",
        pocketImage: FIRST_POCKET_B,
        bacteriumImage: FIRST_BACTERIUM,
        antibioticButtonImage: {
            active: FIRST_ANTIBIOTIC_ACTIVE,
            inactive: FIRST_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: FIRST_LYMPHOCYTE,
        plasmaticImage: FIRST_PLASMATIC,
        memoryImage: FIRST_BMEMORY
    },
    second:{
        colorCode: "#DF1B1B",
        pocketImage: SECOND_POCKET_B,
        bacteriumImage: SECOND_BACTERIUM,
        antibioticButtonImage: {
            active: SECOND_ANTIBIOTIC_ACTIVE,
            inactive: SECOND_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: SECOND_LYMPHOCYTE,
        plasmaticImage: SECOND_PLASMATIC,
        memoryImage: SECOND_BMEMORY
    },
    third:{
        colorCode: "#FF5900",
        pocketImage: THIRD_POCKET_B,
        bacteriumImage: THIRD_BACTERIUM,
        antibioticButtonImage: {
            active: THIRD_ANTIBIOTIC_ACTIVE,
            inactive: THIRD_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: THIRD_LYMPHOCYTE,
        plasmaticImage: THIRD_PLASMATIC,
        memoryImage: THIRD_BMEMORY
},
    fourth:{
        colorCode: "#FFA800",
        pocketImage: FOURTH_POCKET_B,
        bacteriumImage: FOURTH_BACTERIUM,
        antibioticButtonImage: {
            active: FOURTH_ANTIBIOTIC_ACTIVE,
            inactive: FOURTH_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: FOURTH_LYMPHOCYTE,
        plasmaticImage: FOURTH_PLASMATIC,
        memoryImage: FOURTH_BMEMORY
    }
}

//      Viruses
const maxVirusesInTissueCell = 64;
const viralSpreadThreshold = 63;
var VIRUS_DOUBLING_TIME = 200;
var VIRUSES_CLASSIFICATION = {
    first:{
        doublingTime: VIRUS_DOUBLING_TIME,
        price: 50,
        pocketImage: FIRST_POCKET_V,
        colorCode: "#35B1F6",
        TLymphocyteImage: FIRST_TLYMPHOCYTE,
        MemoryImage: FIRST_TMEMORY
    },
    second:{
        doublingTime: VIRUS_DOUBLING_TIME*0.9,
        price: 55,
        pocketImage: SECOND_POCKET_V,
        colorCode: "#1B68D2",
        TLymphocyteImage: SECOND_TLYMPHOCYTE,
        MemoryImage: SECOND_TMEMORY
    },
    third:{
        doublingTime: VIRUS_DOUBLING_TIME*0.75, 
        price: 66,
        pocketImage: THIRD_POCKET_V,
        colorCode: "#5C43E7",
        TLymphocyteImage: THIRD_TLYMPHOCYTE,
        MemoryImage: THIRD_TMEMORY
    },
    fourth:{
        doublingTime: VIRUS_DOUBLING_TIME*0.5,
        price: 100,
        pocketImage: FOURTH_POCKET_V,
        colorCode: "#A441DE",
        TLymphocyteImage: FOURTH_TLYMPHOCYTE,
        MemoryImage: FOURTH_TMEMORY
    }
}

// HIV
const HIV_IMAGE = new Image();
HIV_IMAGE.src = "./images/HIV_texture.png";
const HIV_LONGEVITY = 10000;
const HIV_INFECTION_PROBABILITY = 0.03;
const HIV_DOUBLING_PROBABILITY = 0.0001;
const HIV_DAMAGE = 0.05;

// Cancer
const cancerMutationsThreshold = 20;
const mutationProbability = 0.1;


// Wave forming algorithm parameters
var BACTERIUM_PRICE = 1; 
var VIRUS_PRICE = 25;
var HELMINT_PRICE = 50;
var HIV_PRICE = 30;
var ENEMY_PROB_DIST = [1/BACTERIUM_PRICE, 1/VIRUS_PRICE, 1/HELMINT_PRICE, 1/HIV_PRICE];
var MIN_HELMINT_LENGTH = 4;
var MAX_HELMINT_LENGTH = 20;
var HELMINT_WIDTH_MIN_LENGTH_MULTIPLIER = 3;
var HELMINT_WIDTH_LENGTH_MULTIPLIER = 6;
var HELMINT_HEALTH_LENGTH_WIDTH_MULTIPLIER = 5;
var HELMINT_DELAY_HEALTH_MULTIPLIER= 0.2;
var HELMINT_DELAY_NOISE = 10;
var PROB_TO_ADD_NEW_COLOR_BACTERIA = 0.12;
var PROB_TO_ADD_NEW_COLOR_VIRUS = 0.08;

var MAX_COLOR_PROB_VAL = 10;