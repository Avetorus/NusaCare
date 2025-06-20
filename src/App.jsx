import React, { useState, useEffect, useMemo } from 'react';
import { ChevronsRight, BookOpen, Tv, Gamepad2, BarChart3, User, Search, Bell, Calendar, Download, ChevronLeft, ChevronRight, PlayCircle, Mic, Lock, Star, Award, Settings, Sun, Moon, Languages, Users, ShieldCheck, HeartHandshake, Eye, Volume2, ArrowRight, X, Mail, KeyRound } from 'lucide-react';

// Helper Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-colors duration-300 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button', disabled = false }) => {
  const baseStyle = 'w-full text-center py-3 px-6 rounded-xl font-bold transition-transform transform active:scale-95 text-lg';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/50',
    secondary: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600',
    outline: 'border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-slate-800'
  };
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}>
      {children}
    </button>
  );
};

const IconButton = ({ icon, onClick, className = '' }) => (
    <button onClick={onClick} className={`p-3 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 ${className}`}>
        {icon}
    </button>
);

// Modal Component
const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md m-auto shadow-xl transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-poppins font-bold text-xl text-slate-800 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X/></button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

// New Helper Components for Settings Page
const ToggleSwitch = ({ enabled, setEnabled }) => {
    return (
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
        </button>
    );
};

const SettingsRow = ({ icon, title, subtitle, children }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
        <div className="flex items-center gap-4">
            <div className="text-indigo-500">{icon}</div>
            <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h4>
                {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
            </div>
        </div>
        <div>{children}</div>
    </div>
);

// Auth Form Components
const LoginForm = ({ onLogin, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                <input type="password" placeholder="Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <Button type="submit" className="!mt-6">Masuk</Button>
            <p className="text-center text-sm text-slate-500">
                Belum punya akun?{' '}
                <button type="button" onClick={onSwitchToRegister} className="font-semibold text-indigo-500 hover:underline">Daftar di sini</button>
            </p>
        </form>
    );
};

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(name, email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                <input type="text" placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                <input type="password" placeholder="Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <Button type="submit" className="!mt-6">Daftar Akun</Button>
            <p className="text-center text-sm text-slate-500">
                Sudah punya akun?{' '}
                <button type="button" onClick={onSwitchToLogin} className="font-semibold text-indigo-500 hover:underline">Masuk di sini</button>
            </p>
        </form>
    );
};


// Splash Screen Component
const SplashScreen = () => (
  <div className="fixed inset-0 bg-white dark:bg-slate-900 flex flex-col justify-center items-center z-50 animate-fadeOut">
    <div className="text-center">
      <div className="flex justify-center items-center gap-4 mb-4">
        <HeartHandshake className="w-16 h-16 text-indigo-500"/>
        <h1 className="font-poppins font-extrabold text-5xl text-slate-800 dark:text-white">BelajarBersama</h1>
      </div>
      <p className="font-inter text-slate-500 dark:text-slate-400 text-xl mt-2">Pendidikan untuk Semua, Tanpa Batas.</p>
      <div className="mt-8 text-center text-3xl">
        <span className="animate-pulse">👧</span><span className="animate-pulse" style={{animationDelay: '0.2s'}}>🧑‍🦽</span><span className="animate-pulse" style={{animationDelay: '0.4s'}}>👦</span><span className="animate-pulse" style={{animationDelay: '0.6s'}}>👨‍🏫</span><span className="animate-pulse" style={{animationDelay: '0.8s'}}>👩</span>
      </div>
    </div>
    <div className="absolute bottom-10 w-full px-10"><div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5"><div className="bg-indigo-500 h-2.5 rounded-full animate-loadingBar"></div></div></div>
  </div>
);

// Welcome Screen (Pra-Login) Component
const WelcomeScreen = ({ onShowLogin, onShowRegister, onGuestMode }) => {
    const features = [{ icon: <Download className="w-8 h-8 text-teal-500"/>, title: "Belajar Offline", desc: "Unduh modul & belajar tanpa internet." },{ icon: <Eye className="w-8 h-8 text-blue-500"/>, title: "Dukungan Disabilitas", desc: "Fitur aksesibilitas lengkap." },{ icon: <PlayCircle className="w-8 h-8 text-rose-500"/>, title: "Video Edukatif", desc: "Animasi menarik & mudah dipahami." },{ icon: <Tv className="w-8 h-8 text-purple-500"/>, title: "Kelas Live", desc: "Interaksi langsung dengan guru ahli." },{ icon: <Users className="w-8 h-8 text-amber-500"/>, title: "Konten Inklusif", desc: "Materi ramah gender & budaya." }];
    return (<div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-inter text-slate-800 dark:text-slate-100 p-6 md:p-8 transition-colors duration-300"><header className="flex justify-between items-center mb-8"><div className="flex items-center gap-2"><HeartHandshake className="w-8 h-8 text-indigo-500"/><h1 className="font-poppins font-bold text-2xl">BelajarBersama</h1></div><div className="flex items-center gap-4"><div className="relative group"><Languages className="w-6 h-6 text-slate-600 dark:text-slate-300 cursor-pointer"/><div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10"><a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">Bahasa Indonesia</a><a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">Basa Jawa</a><a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">Basa Sunda</a></div></div><Eye className="w-6 h-6 text-slate-600 dark:text-slate-300 cursor-pointer"/></div></header><main><div className="text-center mb-10"><h2 className="font-poppins font-extrabold text-4xl md:text-5xl mb-3 leading-tight">Membuka Gerbang Ilmu,</h2><h2 className="font-poppins font-extrabold text-4xl md:text-5xl text-indigo-500 mb-4">Untuk Setiap Anak Bangsa.</h2><p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-lg">Platform pendidikan inklusif yang dirancang untuk memberdayakan masa depan Indonesia.</p></div><div className="max-w-lg mx-auto space-y-4 mb-10"><Button onClick={onShowLogin} variant="primary">Masuk</Button><Button onClick={onShowRegister} variant="secondary">Daftar Akun Baru</Button><button onClick={onGuestMode} className="w-full text-center text-indigo-500 dark:text-indigo-400 font-semibold hover:underline">Jelajahi Tanpa Login (Mode Tamu)</button></div><div className="mt-16"><h3 className="text-center font-poppins font-bold text-2xl mb-8">Kenapa Memilih Kami?</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{features.map((feature, index) => (<div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"><div className="bg-indigo-100 dark:bg-slate-700 p-3 rounded-full">{feature.icon}</div><div><h4 className="font-poppins font-bold text-lg mb-1">{feature.title}</h4><p className="text-slate-600 dark:text-slate-400 text-sm">{feature.desc}</p></div></div>))}</div></div></main><footer className="text-center mt-16 text-slate-500 dark:text-slate-400"><p>&copy; {new Date().getFullYear()} BelajarBersama Foundation</p><a href="#" className="text-sm hover:underline"><Lock className="inline w-4 h-4 mr-1"/> Privasi & Keamanan Data</a></footer></div>);
};

// ---- POST-LOGIN COMPONENTS ----

// Mock Data
const mockProgress = { daily: [{ day: 'Sen', value: 30 },{ day: 'Sel', value: 45 },{ day: 'Rab', value: 60 },{ day: 'Kam', value: 20 },{ day: 'Jum', value: 75 },{ day: 'Sab', value: 50 },{ day: 'Min', value: 90 },], overall: { completed: 12, inProgress: 5, total: 30 } };
const lastOpenedModule = { subject: 'Matematika', title: 'Pecahan Sederhana', progress: 0.6, icon: () => <BookOpen className="w-8 h-8 text-indigo-500" /> };
const mockModules = [{ id: 1, subject: 'Matematika', title: 'Penjumlahan & Pengurangan', status: 'completed', icon: 'https://placehold.co/100x80/fca5a5/4c0519?text=Matematika' },{ id: 2, subject: 'Bahasa Indonesia', title: 'Membaca Puisi', status: 'in-progress', icon: 'https://placehold.co/100x80/818cf8/1e1b4b?text=Bahasa' },{ id: 3, subject: 'Ilmu Pengetahuan Alam', title: 'Siklus Air', status: 'not-started', icon: 'https://placehold.co/100x80/6ee7b7/064e3b?text=IPA' },{ id: 4, subject: 'Ilmu Pengetahuan Sosial', title: 'Kerajaan Nusantara', status: 'not-started', icon: 'https://placehold.co/100x80/fcd34d/78350f?text=IPS' },{ id: 5, subject: 'Seni Budaya', title: 'Menggambar Perspektif', status: 'completed', icon: 'https://placehold.co/100x80/f9a8d4/831843?text=Seni' }];
const mockLiveClasses = [{ id: 1, topic: 'Bedah Soal Ujian Nasional IPA', teacher: 'Ibu Amalia', time: 'Besok, 10:00 WIB', registered: true },{ id: 2, topic: 'Creative Writing: Cerpen', teacher: 'Bapak Budi', time: 'Lusa, 14:00 WIB', registered: false },{ id: 3, topic: 'Dasar-dasar Coding untuk Anak', teacher: 'Kak Rian', time: '25 Juni, 16:00 WIB', registered: false }];
const mockGames = [{ id: 1, title: "Teka-Teki Angka", category: "Matematika", icon: <Gamepad2 className="w-8 h-8 text-green-500"/>, description: "Asah logikamu dengan angka!"},{ id: 2, title: "Sambung Kata", category: "Bahasa", icon: <Gamepad2 className="w-8 h-8 text-blue-500"/>, description: "Perluas kosakatamu sambil bermain."},{ id: 3, title: "Jelajah Galaksi", category: "Sains", icon: <Gamepad2 className="w-8 h-8 text-purple-500"/>, description: "Kenali planet di tata surya."}];
const mockCertificates = [{id: 1, title: "Master Perkalian Dasar", date: "15 Mei 2024"},{id: 2, title: "Ahli Tata Surya", date: "28 Mei 2024"},{id: 3, title: "Pujangga Cilik Indonesia", date: "5 Juni 2024"}];


const HomePage = ({ user, setPage, showModal }) => (
    <div className="p-6 space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="font-poppins font-bold text-2xl text-slate-800 dark:text-white">Selamat datang, {user.name}!</h1>
                <p className="text-slate-500 dark:text-slate-400">Siap belajar hari ini? 🔥</p>
            </div>
            <img src={user.avatar} alt="User Avatar" className="w-14 h-14 rounded-full border-4 border-indigo-500 shadow-lg bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-2xl" />
        </div>
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white"><h3 className="font-poppins font-bold text-xl mb-4">Progres Mingguan</h3><div className="flex items-end justify-between h-32">{mockProgress.daily.map((d, i) => (<div key={i} className="flex flex-col items-center w-1/7 gap-2"><div className="w-full h-full flex items-end"><div className="w-full bg-white/30 hover:bg-white/50 transition-all rounded-t-md" style={{ height: `${d.value}%` }}></div></div><span className="text-xs font-medium">{d.day}</span></div>))}</div></Card>
        <Card><h3 className="font-poppins font-bold text-lg mb-4">Lanjutkan Belajar</h3><div className="flex items-center gap-4 bg-indigo-50 dark:bg-slate-700 p-4 rounded-xl"><div className="bg-white p-3 rounded-lg shadow-sm">{lastOpenedModule.icon()}</div><div><p className="text-sm text-slate-500 dark:text-slate-400">{lastOpenedModule.subject}</p><p className="font-bold text-slate-800 dark:text-white">{lastOpenedModule.title}</p></div><button onClick={() => showModal("Info", `Melanjutkan modul "${lastOpenedModule.title}". Selamat belajar!`)} className="ml-auto bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600"><PlayCircle className="w-6 h-6" /></button></div><div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-600 mt-4"><div className="bg-indigo-500 h-2.5 rounded-full" style={{width: `${lastOpenedModule.progress * 100}%`}}></div></div></Card>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">{[{label: 'Modul', icon: <BookOpen/>, page: 'kelas'}, {label: 'Kelas Live', icon: <Tv/>, page: 'live'}, {label: 'Game', icon: <Gamepad2/>, page: 'game'}, {label: 'Laporan', icon: <BarChart3/>, page: 'laporan'}].map(item => (<button key={item.label} onClick={() => setPage(item.page)} className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"><div className="text-indigo-500">{React.cloneElement(item.icon, {className: "w-8 h-8"})}</div><span className="font-semibold text-sm">{item.label}</span></button>))}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Card><h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-amber-500"/> Notifikasi</h3><ul className="space-y-3"><li className="flex items-start gap-3 text-sm"><div className="w-2 h-2 bg-rose-500 rounded-full mt-1.5 flex-shrink-0"></div><div>Tugas "Sistem Pencernaan" harus dikumpulkan besok.</div></li><li className="flex items-start gap-3 text-sm"><div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div><div>Kelas Live "Bedah Soal" akan dimulai 1 jam lagi.</div></li></ul></Card><Card><h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-green-500"/> Kalender Belajar</h3><div className="flex items-center justify-between"><ChevronLeft className="w-6 h-6 cursor-pointer"/><span className="font-semibold">Juni 2024</span><ChevronRight className="w-6 h-6 cursor-pointer"/></div><div className="grid grid-cols-7 text-center text-sm mt-3 gap-y-2">{['Mg', 'Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb'].map(d => (<div key={d} className="font-bold text-slate-400">{d}</div>))
        }{Array.from({length: 30}).map((_, i) => (<div key={`day-cell-${i}`} className={`p-1 ${i+1 === 20 ? 'bg-indigo-500 text-white rounded-full' : ''}`}>{i+1}</div>))}</div></Card></div>
        <div className="text-center p-6 bg-teal-50 dark:bg-teal-900/50 rounded-2xl border-l-4 border-teal-500"><p className="font-inter text-teal-800 dark:text-teal-200 italic">"Belajar itu menyenangkan kalau kamu punya tujuan!"</p><p className="text-sm text-teal-600 dark:text-teal-400 mt-1">- Tips dari Guru</p></div>
    </div>
);

const ClassesPage = ({ showModal, isGuest }) => {
    const handleAction = (title, action) => {
        if(isGuest){
            showModal("Akses Terbatas", "Anda harus mendaftar atau masuk untuk menggunakan fitur ini.");
        } else {
            showModal("Info", `Anda ${action} modul "${title}".`);
        }
    };
    return (
        <div className="p-6 animate-fadeIn">
            <h1 className="font-poppins font-bold text-3xl mb-2">Kelas & Modul</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Pilih mata pelajaran dan mulai petualangan belajarmu!</p>
            <div className="space-y-4">
            {mockModules.map(modul => (
              <Card key={modul.id} className="flex items-center gap-4 hover:-translate-y-1 transition-transform">
                <img src={modul.icon} alt={modul.subject} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-grow">
                  <p className="text-sm text-indigo-500 font-semibold">{modul.subject}</p>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white">{modul.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <IconButton onClick={() => handleAction(modul.title, "mengunduh")} icon={<Download className="w-5 h-5"/>} />
                    <IconButton onClick={() => handleAction(modul.title, "memulai")} icon={<ArrowRight className="w-5 h-5"/>} className="bg-indigo-500 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"/>
                </div>
              </Card>
            ))}
          </div>
        </div>
    );
};

const LiveClassPage = ({ showModal, isGuest }) => {
     const handleAction = (title) => {
        if(isGuest){
            showModal("Akses Terbatas", "Anda harus mendaftar atau masuk untuk mendaftar kelas live.");
        } else {
            showModal("Info", `Anda berhasil mendaftar untuk kelas "${title}".`);
        }
    };
    return (
        <div className="p-6 animate-fadeIn">
            <h1 className="font-poppins font-bold text-3xl mb-2">Kelas Live</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Ikuti kelas langsung bersama guru-guru hebat dari seluruh Indonesia.</p>
            <div className="space-y-4">
            {mockLiveClasses.map(kelas => (
                <Card key={kelas.id}>
                    <div className="flex items-center gap-4">
                        <div className="flex-grow">
                           <h3 className="font-poppins font-bold text-xl text-slate-800 dark:text-white">{kelas.topic}</h3>
                           <p className="text-slate-500 dark:text-slate-400 mt-1">oleh {kelas.teacher}</p>
                        </div>
                        <Button onClick={() => handleAction(kelas.topic)} variant={kelas.registered ? "secondary" : "primary"} className="!w-auto !py-2 !px-4 !text-base" disabled={kelas.registered}>
                           {kelas.registered ? "Terdaftar" : "Daftar"}
                        </Button>
                    </div>
                </Card>
            ))}
            </div>
        </div>
    );
};

const GamesPage = ({ showModal }) => {
    return (
        <div className="p-6 animate-fadeIn">
            <h1 className="font-poppins font-bold text-3xl mb-2">Arena Bermain</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Belajar jadi seru dengan mini game edukatif!</p>
            <Card className="mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
                <h2 className="font-poppins font-bold text-xl">Tantangan Harian</h2>
                <p className="opacity-90 mb-4">Selesaikan kuis cepat dan dapatkan poin ekstra!</p>
                <Button onClick={() => showModal("Info", "Memulai tantangan kuis harian.")} variant="secondary" className="!bg-white !text-green-500 !w-auto !py-2 !px-4 !text-base">Mulai Tantangan</Button>
            </Card>
            <div className="space-y-4">
                {mockGames.map(game => (
                    <Card key={game.id} className="flex items-center gap-4">
                        <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-xl">{game.icon}</div>
                        <div className="flex-grow">
                            <h3 className="font-poppins font-bold text-lg">{game.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{game.description}</p>
                        </div>
                        <Button onClick={() => showModal("Info", `Memulai game "${game.title}".`)} variant="primary" className="!w-auto !py-2 !px-4 !text-sm">Mainkan</Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const ReportsPage = ({ showModal, user, onLogout, theme, toggleTheme }) => {
    const [tab, setTab] = useState('aktivitas');
    const {completed, inProgress, total} = mockProgress.overall;
    const completionPercentage = Math.round((completed / total) * 100);
    const [notifBelajar, setNotifBelajar] = useState(true);
    const [notifUpdate, setNotifUpdate] = useState(true);
    const [textSize, setTextSize] = useState('normal');

    const SettingsContent = () => (
        <div className="animate-fadeIn space-y-4">
            <Card>
                <h3 className="font-poppins font-bold text-xl mb-2">Profil</h3>
                <SettingsRow icon={<User />} title={user.name} subtitle="Jenjang: Sekolah Dasar">
                    <Button onClick={() => showModal("Info", "Fitur ubah profil akan datang.")} variant="secondary" className="!w-auto !py-1 !px-3 !text-sm">Ubah</Button>
                </SettingsRow>
            </Card>
            <Card>
                <h3 className="font-poppins font-bold text-xl mb-2">Preferensi</h3>
                <SettingsRow icon={<Moon />} title="Mode Gelap">
                    <ToggleSwitch enabled={theme === 'dark'} setEnabled={toggleTheme} />
                </SettingsRow>
                <SettingsRow icon={<Bell />} title="Notifikasi Belajar">
                    <ToggleSwitch enabled={notifBelajar} setEnabled={setNotifBelajar} />
                </SettingsRow>
            </Card>
            <Card>
                <h3 className="font-poppins font-bold text-xl mb-2">Akun</h3>
                <SettingsRow icon={<Lock />} title="Keluar Akun">
                    <Button onClick={onLogout} variant="outline" className="!w-auto !py-1 !px-3 !text-sm !border-red-500 !text-red-500 hover:!bg-red-500 hover:!text-white">Keluar</Button>
                </SettingsRow>
            </Card>
        </div>
    );

    return (
        <div className="p-6 animate-fadeIn">
            <h1 className="font-poppins font-bold text-3xl mb-6">Laporan & Pengaturan</h1>
            <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
                {[{key: 'aktivitas', label: 'Aktivitas', icon: <BarChart3/>},{key: 'sertifikat', label: 'Sertifikat', icon: <ShieldCheck/>},{key: 'pengaturan', label: 'Pengaturan', icon: <Settings/>}].map(item => (
                    <button key={item.key} onClick={() => setTab(item.key)} className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm ${tab === item.key ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-slate-500'}`}>
                        {item.icon}
                        <span className="hidden sm:inline">{item.label}</span>
                    </button>
                ))}
            </div>
            {tab === 'aktivitas' && (
                <div className="space-y-6">
                    <Card>
                        <h2 className="font-poppins font-bold text-xl mb-4">Ringkasan Progres</h2>
                        <div className="relative h-32 w-32 mx-auto">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path className="text-slate-200 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8"></path>
                                <path className="text-indigo-500" strokeDasharray={`${completionPercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round"></path>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold">{completionPercentage}%</span>
                                <span className="text-sm text-slate-500">Selesai</span>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            {tab === 'sertifikat' && (
                <div className="space-y-4">
                    {mockCertificates.map(cert => (
                        <Card key={cert.id} className="flex items-center gap-4">
                            <ShieldCheck className="w-12 h-12 text-amber-500 flex-shrink-0"/>
                            <div className="flex-grow">
                                <h3 className="font-poppins font-bold text-lg">{cert.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Diterima: {cert.date}</p>
                            </div>
                            <Button onClick={() => showModal('Info', `Sertifikat "${cert.title}" akan diunduh.`)} variant="secondary" className="!w-auto !py-1 !px-3 !text-sm">Unduh</Button>
                        </Card>
                    ))}
                </div>
            )}
            {tab === 'pengaturan' && <SettingsContent />}
        </div>
    );
};

// Main App Component (Post-Login)
const MainApp = ({ user, isGuest, onLogout, theme, toggleTheme, showModal }) => {
  const [activeTab, setActiveTab] = useState('beranda');

  const handleNavClick = (tab) => {
      if (isGuest && tab === 'laporan') {
          showModal("Akses Terbatas", "Anda harus mendaftar atau masuk untuk melihat laporan & pengaturan.");
          return;
      }
      setActiveTab(tab);
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'beranda': return <HomePage user={user} setPage={setActiveTab} showModal={showModal}/>;
      case 'kelas': return <ClassesPage showModal={showModal} isGuest={isGuest} />;
      case 'live': return <LiveClassPage showModal={showModal} isGuest={isGuest} />;
      case 'game': return <GamesPage showModal={showModal} />;
      case 'laporan': return <ReportsPage showModal={showModal} user={user} onLogout={onLogout} theme={theme} toggleTheme={toggleTheme} />;
      default: return <HomePage user={user} setPage={setActiveTab} showModal={showModal}/>;
    }
  };

  const navItems = [
    { id: 'beranda', icon: <User />, label: 'Beranda' },
    { id: 'kelas', icon: <BookOpen />, label: 'Kelas' },
    { id: 'live', icon: <Tv />, label: 'Live' },
    { id: 'game', icon: <Gamepad2 />, label: 'Game' },
    { id: 'laporan', icon: <BarChart3 />, label: 'Laporan', restricted: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-inter text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      <div className="fixed top-0 right-4 pt-4 z-20">
            <IconButton onClick={toggleTheme} icon={theme === 'light' ? <Moon className="w-5 h-5"/> : <Sun className="w-5 h-5"/>} className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"/>
        </div>
      <main className="flex-grow pb-24">{renderContent()}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 shadow-top z-10">
        <div className="flex justify-around max-w-lg mx-auto">
          {navItems.map(item => {
              const isDisabled = isGuest && item.restricted;
              return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex flex-col items-center justify-center w-full py-3 transition-colors duration-300 ${activeTab === item.id && !isDisabled ? 'text-indigo-500' : 'text-slate-400'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-indigo-500'}`}
                  >
                    {React.cloneElement(item.icon, { className: 'w-6 h-6 mb-1' })}
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
              );
          })}
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
  const [activeModal, setActiveModal] = useState(null);
  const [modalContent, setModalContent] = useState({ title: '', content: null });
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const showModal = (type, title, content) => {
    setActiveModal(type);
    setModalContent({ title, content });
  };
  
  const hideModal = () => setActiveModal(null);

  useEffect(() => { const timer = setTimeout(() => setIsSplashVisible(false), 2000); return () => clearTimeout(timer);}, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogin = (email, password) => {
    const userFound = users.find(u => u.email === email);
    if (userFound && userFound.password === password) {
      setCurrentUser(userFound);
      setIsLoggedIn(true);
      setIsGuestMode(false);
      hideModal();
    } else {
      showModal('info', 'Login Gagal', 'Email atau kata sandi yang Anda masukkan salah. Silakan coba lagi.');
    }
  };

  const handleRegister = (name, email, password) => {
    if (users.find(u => u.email === email)) {
      showModal('info', 'Pendaftaran Gagal', 'Email ini sudah terdaftar. Silakan gunakan email lain.');
      return;
    }
    const newUser = { name, email, password, avatar: `https://placehold.co/100x100/A78BFA/FFFFFF?text=${name.charAt(0).toUpperCase()}` };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setIsGuestMode(false);
    hideModal();
  };
  
  const handleGuestMode = () => {
    setCurrentUser({ name: 'Tamu', isGuest: true, avatar: `https://placehold.co/100x100/94A3B8/FFFFFF?text=T` });
    setIsLoggedIn(true);
    setIsGuestMode(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsGuestMode(false);
    setCurrentUser(null);
  };

  const renderModalContent = () => {
    switch (activeModal) {
        case 'login': return <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setActiveModal('register')} />;
        case 'register': return <RegisterForm onRegister={handleRegister} onSwitchToLogin={() => setActiveModal('login')} />;
        case 'info': return (<><p>{modalContent.content}</p><Button onClick={hideModal} className="mt-6 !text-base !py-2">Tutup</Button></>);
        default: return null;
    }
  };
  
  const getModalTitle = () => {
    switch (activeModal) {
        case 'login': return 'Masuk ke Akun Anda';
        case 'register': return 'Buat Akun Baru';
        default: return modalContent.title;
    }
  };

  return (
      <>
        {isSplashVisible && <SplashScreen />}
        {!isLoggedIn && !isSplashVisible && (
            <WelcomeScreen 
                onShowLogin={() => setActiveModal('login')} 
                onShowRegister={() => setActiveModal('register')} 
                onGuestMode={handleGuestMode} 
            />
        )}
        {isLoggedIn && !isSplashVisible && (
            <MainApp 
                user={currentUser} 
                isGuest={isGuestMode}
                onLogout={handleLogout} 
                theme={theme} 
                toggleTheme={toggleTheme} 
                showModal={(title, content) => showModal('info', title, content)}
            />
        )}
        <Modal show={!!activeModal} onClose={hideModal} title={getModalTitle()}>
            {renderModalContent()}
        </Modal>
      </>
  );
}
