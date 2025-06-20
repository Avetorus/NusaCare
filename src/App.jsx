import React, { useState, useEffect, useMemo } from 'react';
import { ChevronsRight, BookOpen, Tv, Gamepad2, BarChart3, User, Search, Bell, Calendar, Download, ChevronLeft, ChevronRight, PlayCircle, Mic, Lock, Star, Award, Settings, Sun, Moon, Languages, Users, ShieldCheck, HeartHandshake, Eye, Volume2, ArrowRight } from 'lucide-react';

// Mock Data (Data Tiruan)
const mockUser = {
  name: 'Vincent',
  avatar: `https://placehold.co/100x100/6366F1/FFFFFF?text=V`,
};

const mockProgress = {
  daily: [
    { day: 'Sen', value: 30 },
    { day: 'Sel', value: 45 },
    { day: 'Rab', value: 60 },
    { day: 'Kam', value: 20 },
    { day: 'Jum', value: 75 },
    { day: 'Sab', value: 50 },
    { day: 'Min', value: 90 },
  ],
  overall: {
    completed: 12,
    inProgress: 5,
    total: 30
  }
};

const lastOpenedModule = {
  subject: 'Matematika',
  title: 'Pecahan Sederhana',
  progress: 0.6,
  icon: () => <BookOpen className="w-8 h-8 text-indigo-500" />
};

const mockModules = [
  { id: 1, subject: 'Matematika', title: 'Penjumlahan & Pengurangan', status: 'completed', icon: 'https://placehold.co/100x80/fca5a5/4c0519?text=Matematika' },
  { id: 2, subject: 'Bahasa Indonesia', title: 'Membaca Puisi', status: 'in-progress', icon: 'https://placehold.co/100x80/818cf8/1e1b4b?text=Bahasa' },
  { id: 3, subject: 'Ilmu Pengetahuan Alam', title: 'Siklus Air', status: 'not-started', icon: 'https://placehold.co/100x80/6ee7b7/064e3b?text=IPA' },
  { id: 4, subject: 'Ilmu Pengetahuan Sosial', title: 'Kerajaan Nusantara', status: 'not-started', icon: 'https://placehold.co/100x80/fcd34d/78350f?text=IPS' },
  { id: 5, subject: 'Seni Budaya', title: 'Menggambar Perspektif', status: 'completed', icon: 'https://placehold.co/100x80/f9a8d4/831843?text=Seni' },
];

const mockLiveClasses = [
    { id: 1, topic: 'Bedah Soal Ujian Nasional IPA', teacher: 'Ibu Amalia', time: 'Besok, 10:00 WIB', registered: true },
    { id: 2, topic: 'Creative Writing: Cerpen', teacher: 'Bapak Budi', time: 'Lusa, 14:00 WIB', registered: false },
    { id: 3, topic: 'Dasar-dasar Coding untuk Anak', teacher: 'Kak Rian', time: '25 Juni, 16:00 WIB', registered: false },
];

const mockGames = [
    { id: 1, title: "Teka-Teki Angka", category: "Matematika", icon: <Gamepad2 className="w-8 h-8 text-green-500"/>, description: "Asah logikamu dengan angka!"},
    { id: 2, title: "Sambung Kata", category: "Bahasa", icon: <Gamepad2 className="w-8 h-8 text-blue-500"/>, description: "Perluas kosakatamu sambil bermain."},
    { id: 3, title: "Jelajah Galaksi", category: "Sains", icon: <Gamepad2 className="w-8 h-8 text-purple-500"/>, description: "Kenali planet di tata surya."},
];

const mockCertificates = [
    {id: 1, title: "Master Perkalian Dasar", date: "15 Mei 2024"},
    {id: 2, title: "Ahli Tata Surya", date: "28 Mei 2024"},
    {id: 3, title: "Pujangga Cilik Indonesia", date: "5 Juni 2024"},
];

// Helper Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = '', variant = 'primary' }) => {
  const baseStyle = 'w-full text-center py-3 px-6 rounded-xl font-bold transition-transform transform active:scale-95 text-lg';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/50',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600',
    outline: 'border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-700'
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const IconButton = ({ icon, onClick, className = '' }) => (
    <button onClick={onClick} className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${className}`}>
        {icon}
    </button>
);


// Splash Screen Component
const SplashScreen = () => (
  <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col justify-center items-center z-50 animate-fadeOut">
    <div className="text-center">
      <div className="flex justify-center items-center gap-4 mb-4">
        <HeartHandshake className="w-16 h-16 text-indigo-500"/>
        <h1 className="font-poppins font-extrabold text-5xl text-gray-800 dark:text-white">BelajarBersama</h1>
      </div>
      <p className="font-inter text-gray-500 dark:text-gray-400 text-xl mt-2">Pendidikan untuk Semua, Tanpa Batas.</p>
      <div className="mt-8 text-center text-3xl">
        <span className="animate-pulse">👧</span>
        <span className="animate-pulse" style={{animationDelay: '0.2s'}}>🧑‍🦽</span>
        <span className="animate-pulse" style={{animationDelay: '0.4s'}}>👦</span>
        <span className="animate-pulse" style={{animationDelay: '0.6s'}}>👨‍🏫</span>
        <span className="animate-pulse" style={{animationDelay: '0.8s'}}>👩</span>
      </div>
    </div>
    <div className="absolute bottom-10 w-full px-10">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className="bg-indigo-500 h-2.5 rounded-full animate-loadingBar"></div>
      </div>
    </div>
  </div>
);

// Welcome Screen (Pra-Login) Component
const WelcomeScreen = ({ onLogin, onRegister, onGuestMode }) => {
    const features = [
        { icon: <Download className="w-8 h-8 text-teal-500"/>, title: "Belajar Offline", desc: "Unduh modul & belajar tanpa internet." },
        { icon: <Eye className="w-8 h-8 text-blue-500"/>, title: "Dukungan Disabilitas", desc: "Fitur aksesibilitas lengkap." },
        { icon: <PlayCircle className="w-8 h-8 text-rose-500"/>, title: "Video Edukatif", desc: "Animasi menarik & mudah dipahami." },
        { icon: <Tv className="w-8 h-8 text-purple-500"/>, title: "Kelas Live", desc: "Interaksi langsung dengan guru ahli." },
        { icon: <Users className="w-8 h-8 text-amber-500"/>, title: "Konten Inklusif", desc: "Materi ramah gender & budaya." },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter text-gray-800 dark:text-gray-100 p-6 md:p-8">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <HeartHandshake className="w-8 h-8 text-indigo-500"/>
                    <h1 className="font-poppins font-bold text-2xl">BelajarBersama</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Languages className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer"/>
                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                           <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Bahasa Indonesia</a>
                           <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Basa Jawa</a>
                           <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Basa Sunda</a>
                        </div>
                    </div>
                    <Eye className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer"/>
                </div>
            </header>

            <main>
                <div className="text-center mb-10">
                    <h2 className="font-poppins font-extrabold text-4xl md:text-5xl mb-3 leading-tight">Membuka Gerbang Ilmu,</h2>
                    <h2 className="font-poppins font-extrabold text-4xl md:text-5xl text-indigo-500 mb-4">Untuk Setiap Anak Bangsa.</h2>
                    <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg">Platform pendidikan inklusif yang dirancang untuk memberdayakan masa depan Indonesia.</p>
                </div>
                
                <div className="max-w-lg mx-auto space-y-4 mb-10">
                    <Button onClick={onLogin} variant="primary">Masuk</Button>
                    <Button onClick={onRegister} variant="secondary">Daftar Akun Baru</Button>
                    <button onClick={onGuestMode} className="w-full text-center text-indigo-500 dark:text-indigo-400 font-semibold hover:underline">
                        Jelajahi Tanpa Login (Mode Tamu)
                    </button>
                </div>

                <div className="mt-16">
                    <h3 className="text-center font-poppins font-bold text-2xl mb-8">Kenapa Memilih Kami?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                             <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-4">
                                <div className="bg-indigo-100 dark:bg-gray-700 p-3 rounded-full">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="font-poppins font-bold text-lg mb-1">{feature.title}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            
            <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} BelajarBersama Foundation</p>
                <a href="#" className="text-sm hover:underline"><Lock className="inline w-4 h-4 mr-1"/> Privasi & Keamanan Data</a>
            </footer>
        </div>
    );
};


// ---- POST-LOGIN COMPONENTS ----

// Beranda Component
const HomePage = ({ user, setPage }) => (
  <div className="p-6 space-y-8">
    {/* Header */}
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-poppins font-bold text-2xl text-gray-800 dark:text-white">Selamat datang, {user.name}!</h1>
        <p className="text-gray-500 dark:text-gray-400">Siap belajar hari ini? 🔥</p>
      </div>
      <img src={user.avatar} alt="User Avatar" className="w-14 h-14 rounded-full border-4 border-indigo-500 shadow-lg" />
    </div>

    {/* Progress Summary */}
    <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <h3 className="font-poppins font-bold text-xl mb-4">Progres Mingguan</h3>
      <div className="flex items-end justify-between h-32">
        {mockProgress.daily.map((d, i) => (
          <div key={i} className="flex flex-col items-center w-1/7 gap-2">
            <div className="w-full h-full flex items-end">
              <div
                className="w-full bg-white/30 hover:bg-white/50 transition-all rounded-t-md"
                style={{ height: `${d.value}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium">{d.day}</span>
          </div>
        ))}
      </div>
    </Card>

    {/* Continue Learning */}
    <Card>
        <h3 className="font-poppins font-bold text-lg mb-4">Lanjutkan Belajar</h3>
        <div className="flex items-center gap-4 bg-indigo-50 dark:bg-gray-700 p-4 rounded-xl">
            <div className="bg-white p-3 rounded-lg shadow-sm">{lastOpenedModule.icon()}</div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{lastOpenedModule.subject}</p>
                <p className="font-bold text-gray-800 dark:text-white">{lastOpenedModule.title}</p>
            </div>
            <button className="ml-auto bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600">
                <PlayCircle className="w-6 h-6" />
            </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600 mt-4">
          <div className="bg-indigo-500 h-2.5 rounded-full" style={{width: `${lastOpenedModule.progress * 100}%`}}></div>
        </div>
    </Card>
    
    {/* Shortcuts */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[{label: 'Modul', icon: <BookOpen/>, page: 'kelas'}, {label: 'Kelas Live', icon: <Tv/>, page: 'live'}, {label: 'Game', icon: <Gamepad2/>, page: 'game'}, {label: 'Kuis', icon: <BarChart3/>, page: 'laporan'}].map(item => (
            <button key={item.label} onClick={() => setPage(item.page)} className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <div className="text-indigo-500">{React.cloneElement(item.icon, {className: "w-8 h-8"})}</div>
                <span className="font-semibold text-sm">{item.label}</span>
            </button>
        ))}
    </div>

    {/* Notifications and Calendar */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-amber-500"/> Notifikasi</h3>
            <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>Tugas "Sistem Pencernaan" harus dikumpulkan besok.</div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>Kelas Live "Bedah Soal" akan dimulai 1 jam lagi.</div>
                </li>
            </ul>
        </Card>
        <Card>
            <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-green-500"/> Kalender Belajar</h3>
            <div className="flex items-center justify-between">
                <ChevronLeft className="w-6 h-6"/>
                <span className="font-semibold">Juni 2024</span>
                <ChevronRight className="w-6 h-6"/>
            </div>
            <div className="grid grid-cols-7 text-center text-sm mt-3 gap-y-2">
                {/* FIX: Using unique keys for day headers to avoid console warnings */}
                {['Mg', 'Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb'].map(d => (
                    <div key={d} className="font-bold text-gray-400">{d}</div>
                ))}
                {Array.from({length: 30}).map((_, i) => (
                    <div key={`day-cell-${i}`} className={`p-1 ${i+1 === 20 ? 'bg-indigo-500 text-white rounded-full' : ''}`}>{i+1}</div>
                ))}
            </div>
        </Card>
    </div>
    
    {/* Daily Motivation */}
    <div className="text-center p-6 bg-teal-50 dark:bg-teal-900/50 rounded-2xl border-l-4 border-teal-500">
        <p className="font-inter text-teal-800 dark:text-teal-200 italic">"Belajar itu menyenangkan kalau kamu punya tujuan!"</p>
        <p className="text-sm text-teal-600 dark:text-teal-400 mt-1">- Tips dari Guru</p>
    </div>

  </div>
);

// Kelas dan Modul Component
const ClassesPage = () => {
  const [filter, setFilter] = useState('Semua');

  const filteredModules = useMemo(() => {
    if (filter === 'Semua') return mockModules;
    if (filter === 'Selesai') return mockModules.filter(m => m.status === 'completed');
    if (filter === 'Dipelajari') return mockModules.filter(m => m.status === 'in-progress');
    if (filter === 'Belum Mulai') return mockModules.filter(m => m.status === 'not-started');
  }, [filter]);

  const getStatusPill = (status) => {
    switch (status) {
      case 'completed': return <span className="text-xs font-bold text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900 px-2 py-1 rounded-full">Selesai</span>;
      case 'in-progress': return <span className="text-xs font-bold text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900 px-2 py-1 rounded-full">Dipelajari</span>;
      default: return <span className="text-xs font-bold text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-600 px-2 py-1 rounded-full">Belum Mulai</span>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="font-poppins font-bold text-3xl mb-2">Kelas & Modul</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Pilih mata pelajaran dan mulai petualangan belajarmu!</p>
      
      <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
          <input type="text" placeholder="Cari modul, topik, atau pelajaran..." className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
      </div>
      
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {['Semua', 'Selesai', 'Dipelajari', 'Belum Mulai'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ${filter === f ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
                  {f}
              </button>
          ))}
      </div>

      <div className="space-y-4">
        {filteredModules.map(modul => (
          <Card key={modul.id} className="flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <img src={modul.icon} alt={modul.subject} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-grow">
              <p className="text-sm text-indigo-500 font-semibold">{modul.subject}</p>
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">{modul.title}</h3>
              {getStatusPill(modul.status)}
            </div>
            <div className="flex items-center gap-2">
                <IconButton icon={<Download className="w-5 h-5"/>} />
                <IconButton icon={<ArrowRight className="w-5 h-5"/>} className="bg-indigo-500 text-white"/>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Kelas Live Component
const LiveClassPage = () => (
    <div className="p-6">
        <h1 className="font-poppins font-bold text-3xl mb-2">Kelas Live</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Ikuti kelas langsung bersama guru-guru hebat dari seluruh Indonesia.</p>

        <div className="space-y-4">
            {mockLiveClasses.map(kelas => (
                <Card key={kelas.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-grow">
                           <span className="text-xs font-bold uppercase text-indigo-500">Live</span>
                           <h3 className="font-poppins font-bold text-xl text-gray-800 dark:text-white mt-1">{kelas.topic}</h3>
                           <p className="text-gray-500 dark:text-gray-400 mt-1">oleh {kelas.teacher}</p>
                           <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">{kelas.time}</p>
                        </div>
                        <div className="flex-shrink-0">
                           {kelas.registered ? (
                               <Button variant="secondary" className="!w-auto !py-2 !px-4 !text-base">Sudah Terdaftar</Button>
                           ) : (
                               <Button variant="primary" className="!w-auto !py-2 !px-4 !text-base">Daftar Kelas</Button>
                           )}
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-4">
                           <span title="Subtitle Tersedia"><Mic className="w-5 h-5"/></span>
                           <span title="Voice-to-text"><Volume2 className="w-5 h-5"/></span>
                           <span title="Materi Tambahan"><Download className="w-5 h-5"/></span>
                        </div>
                        <a href="#" className="font-semibold text-indigo-500 hover:underline">Lihat Detail</a>
                    </div>
                </Card>
            ))}
        </div>
        
        <div className="mt-8">
            <h2 className="font-poppins font-bold text-2xl mb-4">Rekaman Kelas</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Ketinggalan kelas? Tonton ulang kapan saja.</p>
            {/* Mockup for recordings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-4 shadow-md">
                    <div className="bg-gray-300 dark:bg-gray-700 w-20 h-16 rounded-lg flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-gray-500"/>
                    </div>
                    <div>
                        <h4 className="font-bold">Pengenalan Ekosistem</h4>
                        <p className="text-sm text-gray-500">2 hari yang lalu</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-4 shadow-md">
                    <div className="bg-gray-300 dark:bg-gray-700 w-20 h-16 rounded-lg flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-gray-500"/>
                    </div>
                    <div>
                        <h4 className="font-bold">Tips Menulis Paragraf</h4>
                        <p className="text-sm text-gray-500">5 hari yang lalu</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


// Mini Game Component
const GamesPage = () => (
    <div className="p-6">
        <h1 className="font-poppins font-bold text-3xl mb-2">Arena Bermain</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Belajar jadi seru dengan mini game edukatif!</p>

        <Card className="mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <h2 className="font-poppins font-bold text-xl">Tantangan Harian</h2>
            <p className="opacity-90 mb-4">Selesaikan kuis cepat dan dapatkan poin ekstra!</p>
            <Button variant="secondary" className="!bg-white !text-green-500 !w-auto !py-2 !px-4 !text-base">Mulai Tantangan</Button>
        </Card>

        <div className="space-y-4">
            {mockGames.map(game => (
                <Card key={game.id} className="flex items-center gap-4">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                        {game.icon}
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-poppins font-bold text-lg">{game.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{game.description}</p>
                    </div>
                    <Button variant="primary" className="!w-auto !py-2 !px-4 !text-sm">Mainkan</Button>
                </Card>
            ))}
        </div>

        <Card className="mt-8">
            <h2 className="font-poppins font-bold text-xl mb-4">Papan Peringkat</h2>
             <ul className="space-y-3">
                <li className="flex items-center gap-3 font-semibold">
                    <span className="text-yellow-400">🥇</span> 1. Andini Putri <span className="ml-auto text-gray-500">15.200 Poin</span>
                </li>
                 <li className="flex items-center gap-3 font-semibold">
                    <span className="text-gray-400">🥈</span> 2. Bima Sakti <span className="ml-auto text-gray-500">14.800 Poin</span>
                </li>
                 <li className="flex items-center gap-3 font-semibold">
                    <span className="text-orange-400">🥉</span> 3. Citra Lestari <span className="ml-auto text-gray-500">14.500 Poin</span>
                </li>
                 <li className="flex items-center gap-3">
                    <span className="font-bold">🏆</span> 4. {mockUser.name} <span className="ml-auto text-gray-500">12.300 Poin</span>
                </li>
            </ul>
        </Card>
    </div>
);

// Laporan Component
const ReportsPage = () => {
    const [tab, setTab] = useState('aktivitas');
    const {completed, inProgress, total} = mockProgress.overall;
    const completionPercentage = Math.round((completed / total) * 100);

    return(
        <div className="p-6">
            <h1 className="font-poppins font-bold text-3xl mb-6">Laporan & Prestasi</h1>
            
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                {[
                    {key: 'aktivitas', label: 'Aktivitas', icon: <BarChart3/>},
                    {key: 'badge', label: 'Badge', icon: <Award/>},
                    {key: 'sertifikat', label: 'Sertifikat', icon: <ShieldCheck/>},
                    {key: 'pengaturan', label: 'Pengaturan', icon: <Settings/>},
                ].map(item => (
                    <button key={item.key} onClick={() => setTab(item.key)} className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-colors ${tab === item.key ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-gray-500 hover:text-indigo-500'}`}>
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
            
            {tab === 'aktivitas' && (
                <div className="space-y-6 animate-fadeIn">
                    <Card>
                        <h2 className="font-poppins font-bold text-xl mb-4">Ringkasan Progres</h2>
                        <div className="relative h-32 w-32 mx-auto">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8"></path>
                                <path className="text-indigo-500" strokeDasharray={`${completionPercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round"></path>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold">{completionPercentage}%</span>
                                <span className="text-sm text-gray-500">Selesai</span>
                            </div>
                        </div>
                        <div className="flex justify-around mt-6 text-center">
                            <div>
                                <p className="text-2xl font-bold text-green-500">{completed}</p>
                                <p className="text-sm text-gray-500">Modul Selesai</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-500">{inProgress}</p>
                                <p className="text-sm text-gray-500">Dipelajari</p>
                            </div>
                             <div>
                                <p className="text-2xl font-bold text-gray-500">{total}</p>
                                <p className="text-sm text-gray-500">Total Modul</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <h2 className="font-poppins font-bold text-xl mb-4">Rekomendasi Untukmu</h2>
                        <p className="text-gray-600 dark:text-gray-300">Berdasarkan progresmu di Matematika, coba modul ini selanjutnya:</p>
                        <div className="mt-4 bg-indigo-50 dark:bg-gray-700 p-4 rounded-xl flex items-center gap-3">
                           <BookOpen className="w-8 h-8 text-indigo-500 flex-shrink-0"/>
                           <div>
                             <h4 className="font-bold">Geometri Bangun Ruang</h4>
                             <p className="text-sm text-gray-500 dark:text-gray-400">Tantang dirimu dengan kubus, balok, dan bola!</p>
                           </div>
                           <Button variant="primary" className="!w-auto !py-1 !px-3 !text-sm ml-auto">Mulai</Button>
                        </div>
                    </Card>
                </div>
            )}
            
            {tab === 'sertifikat' && (
                 <div className="space-y-4 animate-fadeIn">
                    {mockCertificates.map(cert => (
                        <Card key={cert.id} className="flex items-center gap-4 bg-gradient-to-r from-amber-50 to-yellow-100 dark:from-amber-900/50 dark:to-yellow-900/50 border-l-4 border-amber-400">
                           <ShieldCheck className="w-12 h-12 text-amber-500 flex-shrink-0"/>
                           <div className="flex-grow">
                             <h3 className="font-poppins font-bold text-lg">{cert.title}</h3>
                             <p className="text-sm text-gray-500 dark:text-gray-400">Diterima: {cert.date}</p>
                           </div>
                           <Button variant="secondary" className="!w-auto !py-1 !px-3 !text-sm">Unduh</Button>
                        </Card>
                    ))}
                 </div>
            )}
        </div>
    );
};

// Main App Component (Post-Login)
const MainApp = ({ user, onLogout, theme, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState('beranda');

  const renderContent = () => {
    switch (activeTab) {
      case 'beranda': return <HomePage user={user} setPage={setActiveTab} />;
      case 'kelas': return <ClassesPage />;
      case 'live': return <LiveClassPage />;
      case 'game': return <GamesPage />;
      case 'laporan': return <ReportsPage />;
      default: return <HomePage user={user} setPage={setActiveTab} />;
    }
  };

  const navItems = [
    { id: 'beranda', icon: <User />, label: 'Beranda' },
    { id: 'kelas', icon: <BookOpen />, label: 'Kelas' },
    { id: 'live', icon: <Tv />, label: 'Live' },
    { id: 'game', icon: <Gamepad2 />, label: 'Game' },
    { id: 'laporan', icon: <BarChart3 />, label: 'Laporan' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter text-gray-800 dark:text-gray-100 flex flex-col">
      <div className="fixed top-0 right-4 pt-4 z-20">
            <IconButton 
                onClick={toggleTheme}
                icon={theme === 'light' ? <Moon className="w-5 h-5"/> : <Sun className="w-5 h-5"/>}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            />
        </div>
      <main className="flex-grow pb-24">
        {renderContent()}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-top z-10">
        <div className="flex justify-around max-w-lg mx-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-full py-3 transition-colors duration-300 ${activeTab === item.id ? 'text-indigo-500' : 'text-gray-400 hover:text-indigo-500'}`}
            >
              {React.cloneElement(item.icon, { className: 'w-6 h-6 mb-1' })}
              <span className="text-xs font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};


// Root App Component
export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Splash screen timer
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleRegister = () => alert("Fungsi pendaftaran akan diimplementasikan di sini.");
  const handleGuestMode = () => {
    setIsLoggedIn(true); // Treat guest as logged in for UI purposes
    setIsGuestMode(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsGuestMode(false);
  };

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  if (isLoggedIn) {
    return <MainApp user={mockUser} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />;
  }

  return <WelcomeScreen onLogin={handleLogin} onRegister={handleRegister} onGuestMode={handleGuestMode} />;
}
