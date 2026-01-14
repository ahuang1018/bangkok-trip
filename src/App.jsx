import React, { useState, useEffect } from 'react';
import { 
  Plane, MapPin, Coffee, Utensils, Camera, ShoppingBag, 
  Sun, Cloud, CloudRain, Navigation, Info, Heart, 
  Briefcase, Phone, Wallet, CheckSquare, ChevronRight, 
  ArrowRight, Droplets, Map, MessageSquare, Send, User, X, 
  Image as ImageIcon, Languages,
  CloudLightning, CloudSnow, Wind,
  Pencil, Trash2, Check, Plus, Calendar
} from 'lucide-react';

// --- Weather API Configuration (Open-Meteo) ---
const BANGKOK_COORDS = { lat: 13.7563, long: 100.5018 };
const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${BANGKOK_COORDS.lat}&longitude=${BANGKOK_COORDS.long}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok`;

const getWeatherIcon = (code) => {
  if (code === 0) return Sun; 
  if (code >= 1 && code <= 3) return Cloud; 
  if (code >= 45 && code <= 48) return Cloud; 
  if (code >= 51 && code <= 67) return CloudRain; 
  if (code >= 80 && code <= 82) return CloudRain; 
  if (code >= 95 && code <= 99) return CloudLightning; 
  return Sun; 
};

const getWeatherDesc = (code) => {
  if (code === 0) return "晴朗";
  if (code >= 1 && code <= 3) return "多雲";
  if (code >= 45 && code <= 48) return "霧";
  if (code >= 51 && code <= 67) return "有雨";
  if (code >= 80 && code <= 82) return "陣雨";
  if (code >= 95 && code <= 99) return "雷雨";
  return "晴時多雲";
};

// --- Data & Configuration ---

const FRIENDS = ["羿傑", "君翰", "逸玫", "兆恩"];

const TRIP_DATES = [
  "2026-03-18", "2026-03-19", "2026-03-20", "2026-03-21", "2026-03-22"
];

const FLIGHT_INFO = {
  outbound: { date: "3/18 (三)", code: "TPE → BKK/DMK", time: "07:00 - 09:50", duration: "3h 50m" },
  inbound: { date: "3/22 (日)", code: "BKK/DMK → TPE", time: "17:50 - 22:25", duration: "3h 35m" }
};

const EMERGENCY_CONTACTS = [
  { name: "泰國觀光警察", number: "1155" },
  { name: "旅遊警察熱線", number: "1699" },
  { name: "急救中心", number: "1669" },
  { name: "駐泰國台北經濟文化辦事處", number: "+66-81-666-4006" },
];

const INITIAL_PACKING_LIST = [
  { category: "證件", items: ["護照 (效期6個月以上)", "簽證/電子簽", "機票/飯店憑證", "保險單"] },
  { category: "金錢/網卡", items: ["泰銖現金", "信用卡 (海外回饋)", "Sim卡/eSim", "兔子卡 (Rabbit Card)"] },
  { category: "衣物", items: ["夏季輕便衣物", "薄外套 (百貨冷氣強)", "好走的鞋", "泳衣 (若飯店有泳池)"] },
  { category: "雜項", items: ["防曬乳/墨鏡", "雨傘/輕便雨衣", "行動電源", "個人藥品 (腸胃藥)", "萬用轉接頭 (泰國雙孔與台相同，但三孔不同)"] },
];

const getImg = (text) => null;

const ITINERARY_DATA = {
  "2026-03-18": {
    dayStr: "Day 1",
    dateStr: "3/18 (三)",
    title: "抵達 & 甜點祈福",
    weather: { temp: "34°C", condition: "Sunny", icon: "sun" },
    events: [
      { id: "d1-1", time: "09:50", type: "flight", title: "抵達曼谷機場", location: "Suvarnabhumi Airport (BKK)", desc: "辦理入境、領行李、購買網卡/換匯。", tags: [] },
      { id: "d1-2", time: "12:00", type: "hotel", title: "飯店 Check-in", location: "Bangkok Hotel", desc: "先寄放行李，輕裝出發。", tags: [], image: getImg("Hotel Lobby") },
      { id: "d1-3", time: "13:30", type: "spot", title: "四面佛", location: "Erawan Shrine, Bangkok", desc: "泰國香火最鼎盛的佛像之一。", guide: "願望成真記得回來還願。買花圈請務必在『圍欄內』的官方櫃台購買。", tags: ["必訪"], image: getImg("Erawan Shrine") },
      { id: "d1-4", time: "14:30", type: "spot", title: "Central World", location: "Central World", desc: "參拜後步行至旁邊百貨吹冷氣。", tags: [], image: getImg("Central World") },
      { id: "d1-5", time: "15:00", type: "food", title: "After You Dessert", location: "After You Central World", desc: "曼谷第一名甜點店。", guide: "必點『泰奶刨冰』，內藏仙草凍與麵包丁，口感豐富。", tags: ["必吃: 泰奶刨冰", "必吃: 蜜糖吐司"], image: getImg("Thai Tea Kakigori") },
      { id: "d1-6", time: "17:00", type: "transport", title: "前往河濱夜市", location: "Sathorn Pier", desc: "搭 BTS 至 Saphan Taksin 2號出口轉免費接駁船，或直接 Grab。", guide: "傍晚搭船可順便欣賞昭披耶河夕陽。", tags: [] },
      { id: "d1-7", time: "18:00", type: "spot", title: "河濱夜市", location: "Asiatique The Riverfront", desc: "倉庫改建的大型夜市，乾淨好逛。", tags: ["摩天輪夜景"], image: getImg("Asiatique") },
      { id: "d1-8", time: "19:30", type: "spot", title: "人妖秀", location: "Calypso Cabaret Asiatique", desc: "經典歌舞表演。", guide: "結束後可與表演者合照，需給小費 (約 50-100 THB)。", tags: ["需預訂"], image: getImg("Cabaret Show") },
    ]
  },
  "2026-03-19": {
    dayStr: "Day 2",
    dateStr: "3/19 (四)",
    title: "野生動物園狂歡",
    weather: { temp: "35°C", condition: "Partly Cloudy", icon: "cloud-sun" },
    events: [
      { id: "d2-1", time: "08:00", type: "transport", title: "出發 Safari World", location: "Safari World", desc: "距離市區約 40-50 分鐘車程。", guide: "強烈建議事先預訂『包車接送』，回程叫車非常困難且昂貴。", tags: ["交通注意"] },
      { id: "d2-2", time: "09:30", type: "spot", title: "Safari World", location: "Safari World", desc: "Safari Park (搭車看動物) + Marine Park (走路看秀)。", guide: "必看『間諜戰 (Spy War)』爆破秀與海豚秀。", tags: ["親子首選", "必看: 餵長頸鹿"], image: getImg("Safari Giraffe") },
      { id: "d2-3", time: "12:00", type: "food", title: "園區午餐", location: "Safari World", desc: "通常包含在套票內的自助餐。", tags: [] },
      { id: "d2-4", time: "16:00", type: "transport", title: "返回市區", location: "Jodd Fairs Rama 9", desc: "前往 Jodd Fairs 夜市區域。", tags: [] },
      { id: "d2-5", time: "18:00", type: "food", title: "Jodd Fairs 夜市", location: "Jodd Fairs Rama 9", desc: "文青風格夜市。", guide: "必吃『火山排骨』與『水果冰沙』。", tags: ["必吃: 火山排骨"], image: getImg("Jodd Fairs Food") },
      { id: "d2-6", time: "20:00", type: "relax", title: "泰式按摩", location: "Rama 9 Massage", desc: "動物園走一天腿很痠，安排 1-2 小時按摩。", tags: ["放鬆推薦"], image: getImg("Thai Massage") },
    ]
  },
  "2026-03-20": {
    dayStr: "Day 3",
    dateStr: "3/20 (五)",
    title: "泰服古蹟 & 高空饗宴",
    weather: { temp: "36°C", condition: "Sunny", icon: "sun" },
    events: [
      { id: "d3-1", time: "09:00", type: "spot", title: "鄭王廟 (Wat Arun)", location: "Wat Arun", desc: "莊嚴潔白的黎明寺，泰服體驗。", guide: "建議選『深色/飽和色』泰服，在白色建築前拍照更跳色。", tags: ["IG熱點"], image: getImg("Wat Arun") },
      { id: "d3-2", time: "12:30", type: "spot", title: "ICONSIAM", location: "ICONSIAM", desc: "曼谷最浮誇百貨。", tags: [], image: getImg("ICONSIAM") },
      { id: "d3-3", time: "13:00", type: "food", title: "SookSiam 水上市場", location: "ICONSIAM G Floor", desc: "位於 G 樓，有冷氣的水上市場。", guide: "推薦『船麵』、『泰式煎餅』、『椰子冰淇淋』。", tags: ["必訪"], image: getImg("Floating Market") },
      { id: "d3-4", time: "17:00", type: "transport", title: "前往水門市場", location: "Baiyoke Sky Hotel", desc: "搭船轉捷運或叫車。", tags: [] },
      { id: "d3-5", time: "18:30", type: "food", title: "Baiyoke 81樓 Buffet", location: "Baiyoke Sky Hotel", desc: "室內海鮮自助餐 + 84樓旋轉觀景台。", guide: "高空夜景CP值高。吃飽後務必上 84 樓戶外旋轉台吹風看夜景。", tags: ["需預訂"], image: getImg("Sky Buffet") },
    ]
  },
  "2026-03-21": {
    dayStr: "Day 4",
    dateStr: "3/21 (六)",
    title: "週末市集 & 玻璃步道",
    weather: { temp: "37°C", condition: "Hot", icon: "sun" },
    events: [
      { id: "d4-1", time: "09:30", type: "shopping", title: "恰圖恰週末市集", location: "Chatuchak Weekend Market", desc: "世界最大市集，僅週末全開。", guide: "極熱！衣服主攻 Section 2-4，飾品在 Section 24。", tags: ["週末限定", "必買: 香氛/泰衣"], image: getImg("Chatuchak Market") },
      { id: "d4-2", time: "12:30", type: "food", title: "市集午餐", location: "Chatuchak Weekend Market", desc: "享用椰子冰、西班牙海鮮燉飯。", tags: [], image: getImg("Coconut Ice Cream") },
      { id: "d4-3", time: "15:00", type: "relax", title: "回飯店休息", location: "Bangkok Hotel", desc: "流汗太多，強烈建議回飯店洗澡補眠。", tags: ["充電時間"] },
      { id: "d4-4", time: "17:00", type: "spot", title: "Mahanakhon SkyWalk", location: "King Power Mahanakhon", desc: "曼谷最高玻璃天空步道。", guide: "下午五點入場剛好可看夕陽轉夜景。注意：走玻璃步道需套鞋套。", tags: ["必訪: 黃金時刻"], image: getImg("SkyWalk Glass") },
    ]
  },
  "2026-03-22": {
    dayStr: "Day 5",
    dateStr: "3/22 (日)",
    title: "甜點巡禮 & 返台",
    weather: { temp: "34°C", condition: "Cloudy", icon: "cloud" },
    events: [
      { id: "d5-1", time: "10:00", type: "hotel", title: "飯店退房", location: "Bangkok Hotel", desc: "寄放行李。", tags: [] },
      { id: "d5-2", time: "10:30", type: "food", title: "Mae Varee 芒果糯米", location: "Mae Varee Mango Sticky Rice", desc: "曼谷最知名的芒果糯米。", guide: "三色糯米飯必買！適合帶去機場當最後的饗宴。", tags: ["必買伴手禮"], image: getImg("Mango Sticky Rice") },
      { id: "d5-3", time: "11:30", type: "food", title: "Terminal 21 Asok", location: "Terminal 21 Asok", desc: "環遊世界主題百貨。", guide: "5樓 Pier 21 美食街需先『儲值卡片』消費，餘額可全退。", tags: ["高CP值午餐"], image: getImg("Terminal 21") },
      { id: "d5-4", time: "12:30", type: "food", title: "Bake A Wish 點心", location: "Terminal 21 Asok", desc: "LG 層。迷你泡芙一顆 10-30 THB。", tags: [], image: getImg("Mini Puffs") },
      { id: "d5-5", time: "13:30", type: "shopping", title: "Big C Supercenter", location: "Big C Rajdamri", desc: "最後伴手禮掃貨。", guide: "必買：MAMA泡麵、小老闆海苔、手標泰奶粉。", tags: ["掃貨"], image: getImg("Big C Snacks") },
      { id: "d5-6", time: "14:30", type: "transport", title: "前往機場", location: "Suvarnabhumi Airport (BKK)", desc: "預留塞車時間，提早出發。", tags: [] },
      { id: "d5-7", time: "17:50", type: "flight", title: "搭機返台", location: "Suvarnabhumi Airport (BKK)", desc: "結束美好的旅程。", tags: [] },
    ]
  }
};

// --- Components ---

const WeatherWidget = ({ weather, isLive }) => {
  let Icon = Sun;
  if (weather.code !== undefined) {
    Icon = getWeatherIcon(weather.code);
  } else {
    if (weather.condition === 'Cloudy' || weather.condition === 'Partly Cloudy') Icon = Cloud;
    if (weather.condition === 'Rain' || weather.condition.includes('Rain')) Icon = CloudRain;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50 p-4 rounded-xl mb-6 border border-stone-200 shadow-sm">
      {isLive && (
        <div className="absolute top-0 right-0 bg-violet-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg animate-pulse">
          LIVE
        </div>
      )}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            {isLive ? 'Live Forecast (BKK)' : 'Estimated Forecast'}
          </p>
          <p className="text-stone-700 font-medium text-lg">
            {weather.desc || weather.condition}
          </p>
          {weather.min && weather.max && (
             <p className="text-xs text-stone-400 mt-0.5">L:{weather.min}° H:{weather.max}°</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-light text-stone-800 tracking-tighter">
            {weather.temp}
          </span>
          <Icon className={`w-10 h-10 ${isLive ? 'text-violet-600' : 'text-stone-600'}`} strokeWidth={1.5} />
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 text-stone-200 opacity-20">
        <Icon className="w-24 h-24" />
      </div>
    </div>
  );
};

const Tag = ({ text }) => {
  const isMust = text.includes("必");
  const isBooking = text.includes("預訂") || text.includes("注意");
  
  let bgClass = "bg-stone-200 text-stone-600";
  if (isMust) bgClass = "bg-amber-100 text-amber-800 border-amber-200";
  if (isBooking) bgClass = "bg-rose-100 text-rose-800 border-rose-200";

  return (
    <span className={`text-[10px] px-2 py-1 rounded-full border border-transparent ${bgClass} font-medium tracking-wide`}>
      {text}
    </span>
  );
};

const EventCard = ({ event, notes = [], onAddNote }) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(FRIENDS[0]);
  const [noteText, setNoteText] = useState("");

  const getIcon = (type) => {
    switch (type) {
      case 'flight': return <Plane className="w-5 h-5" />;
      case 'spot': return <Camera className="w-5 h-5" />;
      case 'food': return <Utensils className="w-5 h-5" />;
      case 'shopping': return <ShoppingBag className="w-5 h-5" />;
      case 'hotel': return <Briefcase className="w-5 h-5" />;
      case 'relax': return <Coffee className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const handleNavClick = () => {
    const query = encodeURIComponent(event.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleSubmitNote = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      onAddNote(event.id, currentUser, noteText);
      setNoteText("");
    }
  };

  return (
    <div className="flex gap-4 mb-8 relative last:mb-24 group">
      <div className="absolute left-[19px] top-10 bottom-[-32px] w-[2px] bg-stone-200 group-last:hidden"></div>
      <div className="relative z-10 flex-shrink-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-sm
          ${event.type === 'food' ? 'bg-orange-50 text-orange-600' : 
            event.type === 'spot' ? 'bg-emerald-50 text-emerald-600' :
            event.type === 'flight' ? 'bg-blue-50 text-blue-600' :
            'bg-stone-50 text-stone-600'}`}>
          {getIcon(event.type)}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="p-4 pb-3 flex gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-stone-400 tracking-wider bg-stone-50 px-2 py-0.5 rounded-md">
                {event.time}
              </span>
              <button 
                onClick={handleNavClick}
                className="text-stone-400 hover:text-blue-500 transition-colors p-1"
                aria-label="Navigate"
              >
                <Navigation className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="font-bold text-stone-800 text-lg mb-1 leading-tight">{event.title}</h3>
            <p className="text-sm text-stone-500 mb-3 leading-relaxed">{event.desc}</p>
            
            {event.guide && (
              <div className="bg-stone-50 p-3 rounded-lg border-l-2 border-stone-300 mb-3">
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  <span className="font-bold not-italic mr-1">💡 嚮導筆記:</span>
                  {event.guide}
                </p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-2 items-center">
              {event.tags && event.tags.map((tag, idx) => <Tag key={idx} text={tag} />)}
            </div>
          </div>

          {event.image && (
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100 self-start mt-1">
               <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-stone-50 bg-stone-50/30 flex justify-end">
          <button 
            onClick={() => setIsNoteOpen(!isNoteOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all
              ${isNoteOpen 
                ? 'bg-stone-800 text-white' 
                : notes.length > 0 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'bg-white text-stone-400 border border-stone-100 hover:border-stone-300'}`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{notes.length > 0 ? `${notes.length} 備註` : '新增備註'}</span>
          </button>
        </div>

        {isNoteOpen && (
          <div className="bg-stone-50 border-t border-stone-100 p-4 animate-in slide-in-from-top-2 duration-200">
            {notes.length > 0 ? (
              <div className="space-y-3 mb-4 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                {notes.map((note, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-600 mt-0.5">
                      {note.user.charAt(0)}
                    </div>
                    <div className="bg-white p-2 rounded-r-lg rounded-bl-lg shadow-sm text-sm text-stone-700 flex-1 border border-stone-100">
                      <span className="text-[10px] text-stone-400 block mb-0.5">{note.user}</span>
                      {note.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-3 text-stone-400 text-xs italic mb-2">
                暫無備註，來當第一個留言的人吧！
              </div>
            )}

            <form onSubmit={handleSubmitNote} className="flex flex-col gap-2">
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {FRIENDS.map(friend => (
                  <button
                    key={friend}
                    type="button"
                    onClick={() => setCurrentUser(friend)}
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors
                      ${currentUser === friend 
                        ? 'bg-stone-800 text-white shadow-sm' 
                        : 'bg-white border border-stone-200 text-stone-500 hover:border-stone-400'}`}
                  >
                    {friend}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder={`以 ${currentUser} 的身份留言...`}
                  className="flex-1 bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-400"
                />
                <button 
                  type="submit"
                  disabled={!noteText.trim()}
                  className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const ToolsTab = () => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('bangkok_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bangkok_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [currency, setCurrency] = useState('THB');

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editCurrency, setEditCurrency] = useState('THB');

  const [packingList, setPackingList] = useState(() => {
    const saved = localStorage.getItem('bangkok_packing_list');
    if (saved) return JSON.parse(saved);
    return INITIAL_PACKING_LIST.map((cat, i) => ({
      id: `cat-${i}`,
      category: cat.category,
      items: cat.items.map((item, j) => ({
        id: `item-${i}-${j}`,
        text: item,
        checked: false,
        deadline: ''
      }))
    }));
  });

  useEffect(() => {
    localStorage.setItem('bangkok_packing_list', JSON.stringify(packingList));
  }, [packingList]);
  
  const [newItemInputs, setNewItemInputs] = useState({});

  const addExpense = () => {
    if (newExpenseName && newExpenseAmount) {
      setExpenses([...expenses, { 
        name: newExpenseName, 
        amount: parseInt(newExpenseAmount), 
        currency, 
        id: Date.now() 
      }]);
      setNewExpenseName('');
      setNewExpenseAmount('');
    }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditAmount(item.amount);
    setEditCurrency(item.currency);
  };

  const saveEditing = () => {
    if (editName && editAmount) {
      setExpenses(expenses.map(item => 
        item.id === editingId 
          ? { ...item, name: editName, amount: parseInt(editAmount), currency: editCurrency }
          : item
      ));
      setEditingId(null);
    }
  };

  const deleteExpense = (id) => {
    if (confirm('確定要刪除這筆項目嗎？')) {
      setExpenses(expenses.filter(item => item.id !== id));
    }
  };

  const totalTHB = expenses.filter(e => e.currency === 'THB').reduce((acc, curr) => acc + curr.amount, 0);
  const totalTWD = expenses.filter(e => e.currency === 'TWD').reduce((acc, curr) => acc + curr.amount, 0);

  const togglePackingItem = (catIdx, itemId) => {
    setPackingList(prev => prev.map((cat, index) => {
        if (index === catIdx) {
            return {
                ...cat,
                items: cat.items.map(item => 
                    item.id === itemId ? { ...item, checked: !item.checked } : item
                )
            };
        }
        return cat;
    }));
  };

  const deletePackingItem = (catIdx, itemId) => {
    if (confirm('確定要刪除這個物品嗎？')) {
        setPackingList(prev => prev.map((cat, index) => {
            if (index === catIdx) {
                return {
                    ...cat,
                    items: cat.items.filter(item => item.id !== itemId)
                };
            }
            return cat;
        }));
    }
  };

  const addPackingItem = (catIdx) => {
    const text = newItemInputs[catIdx]?.trim();
    if (!text) return;

    setPackingList(prev => prev.map((cat, index) => {
        if (index === catIdx) {
            return {
                ...cat,
                items: [...cat.items, { id: `new-${Date.now()}`, text, checked: false, deadline: '' }]
            };
        }
        return cat;
    }));
    setNewItemInputs(prev => ({ ...prev, [catIdx]: '' }));
  };

  const updateItemDeadline = (catIdx, itemId, date) => {
    setPackingList(prev => prev.map((cat, index) => {
        if (index === catIdx) {
            return {
                ...cat,
                items: cat.items.map(item => 
                    item.id === itemId ? { ...item, deadline: date } : item
                )
            };
        }
        return cat;
    }));
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="bg-stone-800 px-4 py-3 flex items-center gap-2">
          <Plane className="w-5 h-5 text-white" />
          <h2 className="text-white font-medium tracking-wide">航班資訊</h2>
        </div>
        <div className="p-4 divide-y divide-stone-100">
          <div className="pb-3">
            <div className="flex justify-between text-sm text-stone-400 mb-1">去程 {FLIGHT_INFO.outbound.date}</div>
            <div className="font-bold text-stone-800 text-lg">{FLIGHT_INFO.outbound.code}</div>
            <div className="text-stone-600">{FLIGHT_INFO.outbound.time} <span className="text-xs text-stone-400">({FLIGHT_INFO.outbound.duration})</span></div>
          </div>
          <div className="pt-3">
            <div className="flex justify-between text-sm text-stone-400 mb-1">回程 {FLIGHT_INFO.inbound.date}</div>
            <div className="font-bold text-stone-800 text-lg">{FLIGHT_INFO.inbound.code}</div>
            <div className="text-stone-600">{FLIGHT_INFO.inbound.time} <span className="text-xs text-stone-400">({FLIGHT_INFO.inbound.duration})</span></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100">
         <div className="bg-rose-50 px-4 py-3 flex items-center gap-2 border-b border-rose-100">
          <Phone className="w-5 h-5 text-rose-500" />
          <h2 className="text-rose-700 font-medium tracking-wide">緊急聯絡</h2>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {EMERGENCY_CONTACTS.map((c, idx) => (
            <a key={idx} href={`tel:${c.number}`} className="flex flex-col p-3 bg-stone-50 rounded-lg active:bg-stone-100 transition-colors">
              <span className="text-xs text-stone-400 mb-1">{c.name}</span>
              <span className="text-stone-800 font-bold">{c.number}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100">
        <div className="bg-emerald-50 px-4 py-3 flex items-center gap-2 border-b border-emerald-100">
          <Wallet className="w-5 h-5 text-emerald-600" />
          <h2 className="text-emerald-800 font-medium tracking-wide">快速記帳</h2>
        </div>
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              placeholder="項目" 
              className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-400"
              value={newExpenseName}
              onChange={(e) => setNewExpenseName(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="金額" 
              className="w-20 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-400"
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(e.target.value)}
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-stone-400"
            >
              <option value="THB">THB</option>
              <option value="TWD">TWD</option>
            </select>
            <button 
              onClick={addExpense}
              className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700"
            >
              <CheckSquare className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-2 mb-4 max-h-60 overflow-y-auto custom-scrollbar pr-1">
            {expenses.length === 0 ? (
              <p className="text-center text-stone-300 text-sm py-2">尚未新增項目</p>
            ) : (
              expenses.map(e => (
                <div key={e.id} className="flex items-center justify-between text-sm border-b border-stone-50 pb-2 mb-2 last:mb-0 last:border-0 hover:bg-stone-50 rounded p-1 transition-colors group">
                  {editingId === e.id ? (
                    <div className="flex items-center gap-2 w-full animate-in fade-in duration-200">
                        <input 
                          type="text" 
                          value={editName}
                          onChange={(ev) => setEditName(ev.target.value)}
                          className="flex-1 min-w-0 bg-white border border-stone-300 rounded px-2 py-1 text-xs focus:border-emerald-500 outline-none"
                          autoFocus
                        />
                        <input 
                          type="number" 
                          value={editAmount}
                          onChange={(ev) => setEditAmount(ev.target.value)}
                          className="w-16 bg-white border border-stone-300 rounded px-2 py-1 text-xs focus:border-emerald-500 outline-none text-right"
                        />
                        <select
                          value={editCurrency}
                          onChange={(ev) => setEditCurrency(ev.target.value)}
                          className="w-16 bg-white border border-stone-300 rounded px-1 py-1 text-xs focus:border-emerald-500 outline-none"
                        >
                          <option value="THB">THB</option>
                          <option value="TWD">TWD</option>
                        </select>
                        <button onClick={saveEditing} className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-full">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-stone-400 hover:text-stone-600 hover:bg-stone-100 p-1.5 rounded-full">
                          <X className="w-4 h-4" />
                        </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-stone-600 truncate flex-1 mr-2">{e.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-stone-800 whitespace-nowrap">
                          {e.amount} <span className="text-xs text-stone-400">{e.currency}</span>
                        </span>
                        <div className="flex items-center">
                          <button 
                            onClick={() => startEditing(e)}
                            className="text-stone-300 hover:text-blue-500 p-1.5 rounded transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => deleteExpense(e.id)}
                            className="text-stone-300 hover:text-rose-500 p-1.5 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
          
          <div className="pt-2 border-t border-stone-100">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-stone-400">總支出 (泰銖)</span>
              <span className="text-lg font-bold text-emerald-600 font-mono">{totalTHB} THB</span>
            </div>
            {totalTWD > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-stone-400">總支出 (台幣)</span>
                <span className="text-lg font-bold text-emerald-600 font-mono">{totalTWD} TWD</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100">
        <div className="px-4 py-3 border-b border-stone-100 flex items-center gap-2">
           <Briefcase className="w-5 h-5 text-stone-600" />
           <h2 className="text-stone-800 font-medium tracking-wide">行李清單</h2>
        </div>
        <div className="p-4 space-y-6">
          {packingList.map((cat, catIdx) => (
            <div key={cat.id}>
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">{cat.category}</h3>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div key={item.id} className="flex flex-col gap-1 text-sm text-stone-600 group border-b border-stone-50 pb-2 last:border-0">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        className="rounded text-stone-600 focus:ring-stone-500 border-stone-300"
                        checked={item.checked}
                        onChange={() => togglePackingItem(catIdx, item.id)}
                      />
                      <span className={`flex-1 ${item.checked ? 'line-through text-stone-400' : ''}`}>
                        {item.text}
                      </span>
                      <div className="relative">
                        <input 
                          type="date" 
                          className="absolute inset-0 opacity-0 w-full cursor-pointer"
                          onChange={(e) => updateItemDeadline(catIdx, item.id, e.target.value)}
                        />
                        <button className={`p-1 rounded hover:bg-stone-100 transition-colors ${item.deadline ? 'text-amber-500' : 'text-stone-300'}`}>
                          <Calendar className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button 
                        onClick={() => deletePackingItem(catIdx, item.id)}
                        className="text-stone-300 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {item.deadline && (
                      <div className="pl-6 text-[10px] text-amber-600 font-medium flex items-center gap-1">
                        <span>⚠️ 期限: {item.deadline}</span>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="flex gap-2 items-center mt-1 pt-1 pl-6 opacity-60 hover:opacity-100 transition-opacity">
                  <input
                    type="text"
                    placeholder="新增項目..."
                    className="flex-1 bg-transparent border-b border-stone-200 text-xs py-1 focus:outline-none focus:border-stone-400"
                    value={newItemInputs[catIdx] || ''}
                    onChange={(e) => setNewItemInputs({...newItemInputs, [catIdx]: e.target.value})}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addPackingItem(catIdx);
                    }}
                  />
                  <button 
                    onClick={() => addPackingItem(catIdx)}
                    className="bg-stone-100 text-stone-500 p-1 rounded-full hover:bg-stone-200 hover:text-stone-700"
                    disabled={!newItemInputs[catIdx]?.trim()}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [selectedDay, setSelectedDay] = useState("2026-03-18");
  const [eventNotes, setEventNotes] = useState(() => {
    const saved = localStorage.getItem('bangkok_notes');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('bangkok_notes', JSON.stringify(eventNotes));
  }, [eventNotes]);

  const [weatherData, setWeatherData] = useState(null);
  const currentDayData = ITINERARY_DATA[selectedDay];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(WEATHER_API_URL);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        const transformedData = {
          current: {
            temp: Math.round(data.current.temperature_2m) + "°C",
            code: data.current.weather_code,
            desc: getWeatherDesc(data.current.weather_code)
          },
          daily: data.daily.time.map((_, idx) => ({
            temp: Math.round(data.daily.temperature_2m_max[idx]) + "°C",
            min: Math.round(data.daily.temperature_2m_min[idx]),
            max: Math.round(data.daily.temperature_2m_max[idx]),
            code: data.daily.weather_code[idx],
            desc: getWeatherDesc(data.daily.weather_code[idx])
          }))
        };
        setWeatherData(transformedData);
      } catch (err) {
        console.warn("Weather API unavailable, switching to static/mock data.", err);
      }
    };
    fetchWeather();
  }, []);

  let displayWeather = currentDayData.weather;
  let isLiveWeather = false;

  if (weatherData) {
    const tripDayIndex = TRIP_DATES.indexOf(selectedDay);
    if (tripDayIndex !== -1 && weatherData.daily[tripDayIndex]) {
       const dailyForecast = weatherData.daily[tripDayIndex];
       displayWeather = {
         temp: dailyForecast.temp,
         condition: dailyForecast.desc,
         code: dailyForecast.code,
         desc: dailyForecast.desc,
         min: dailyForecast.min,
         max: dailyForecast.max
       };
       isLiveWeather = true;
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedDay]);

  const handleAddNote = (eventId, user, text) => {
    setEventNotes(prev => ({
      ...prev,
      [eventId]: [...(prev[eventId] || []), { user, text, timestamp: Date.now() }]
    }));
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-stone-200">
      <header className="sticky top-0 z-30 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 px-4 py-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-stone-800">曼谷精華之旅</h1>
            <p className="text-xs text-stone-500 tracking-wide mt-0.5">2026.03.18 - 03.22</p>
          </div>
          <div className="bg-stone-200 text-stone-600 text-[10px] font-bold px-2 py-1 rounded">
            5 Days
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto min-h-screen">
        {activeTab === 'itinerary' && (
          <>
            <div className="sticky top-[73px] z-20 bg-stone-50 pt-2 pb-2 overflow-x-auto no-scrollbar border-b border-stone-200 shadow-sm">
              <div className="flex px-4 gap-3 min-w-max">
                {TRIP_DATES.map((date) => {
                  const info = ITINERARY_DATA[date];
                  const isSelected = selectedDay === date;
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDay(date)}
                      className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300
                        ${isSelected 
                          ? 'bg-stone-800 text-white shadow-md scale-105' 
                          : 'bg-white text-stone-400 border border-stone-100 hover:border-stone-300'}`}
                    >
                      <span className="text-[10px] font-medium tracking-widest uppercase mb-1">{info.dayStr}</span>
                      <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-stone-600'}`}>
                        {date.split('-')[2]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="px-4 py-6">
              <div className="mb-2">
                <span className="text-stone-400 text-sm font-medium">{currentDayData.dateStr}</span>
              </div>

              <WeatherWidget weather={displayWeather} isLive={isLiveWeather} />

              <div className="mt-6">
                {currentDayData.events.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    notes={eventNotes[event.id] || []}
                    onAddNote={handleAddNote}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'tools' && <ToolsTab />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 pb-safe">
        <div className="max-w-md mx-auto flex justify-around items-center h-16">
          <button 
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1
              ${activeTab === 'itinerary' ? 'text-stone-800' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <Map className="w-5 h-5" strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">行程</span>
          </button>
          
          <div className="w-[1px] h-8 bg-stone-100"></div>

          <button 
            onClick={() => setActiveTab('tools')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1
              ${activeTab === 'tools' ? 'text-stone-800' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <Briefcase className="w-5 h-5" strokeWidth={activeTab === 'tools' ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">工具箱</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;