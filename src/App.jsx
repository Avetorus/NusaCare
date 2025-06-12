import React, { useState, useEffect } from 'react';
import { Home, Briefcase, Users, Bell, User, HeartPulse, GraduationCap, Scale, Lightbulb, Building, MapPin, Search, Menu, X, ArrowRight, BookOpen, ShoppingCart, MessageSquare, ShieldCheck, Languages, Sun, Moon, Star, Award, ChevronDown, CheckCircle, Clock, Volume2, Settings, ArrowLeft, Stethoscope, Video, Pencil, Map, Trash2, MailCheck, Edit, FileText, BarChart2, Badge, History, Mic, Hand, Palette, Music, Puzzle, Sparkles, ThumbsUp, MessageCircle, PlusCircle } from 'lucide-react';

// --- Mock Data ---
const featuredServices = [
    { id: 'NusaSehat', icon: <HeartPulse size={40} className="text-green-500" />, title: "Layanan Kesehatan", desc: "Akses dokter dan informasi kesehatan kapan saja.", color: 'green' },
    { id: 'NusaCerdas', icon: <GraduationCap size={40} className="text-blue-500" />, title: "Layanan Pendidikan", desc: "Pendidikan berkualitas untuk semua jenjang.", color: 'blue' },
    { id: 'NusaSetara', icon: <Scale size={40} className="text-purple-500" />, title: "Layanan Kesetaraan", desc: "Pelatihan dan komunitas untuk kesetaraan.", color: 'purple' },
    { id: 'NusaInovasi', icon: <Lightbulb size={40} className="text-orange-500" />, title: "Layanan UMKM & Inovasi", desc: "Bawa usahamu ke level selanjutnya.", color: 'orange' },
    { id: 'NusaBangun', icon: <Building size={40} className="text-gray-500" />, title: "Layanan Infrastruktur", desc: "Laporkan dan usulkan pembangunan.", color: 'gray' },
];

const serviceFeatures = {
    NusaSehat: [
        { id: 'konsultasi', title: 'Konsultasi Dokter', icon: <Stethoscope/> },
        { id: 'cekGejala', title: 'Cek Gejala Mandiri', icon: <Pencil/> },
        { id: 'petaFaskes', title: 'Peta Fasilitas Kesehatan', icon: <Map/> },
    ],
    NusaSetara: [
        { id: 'konseling', title: 'Layanan Konseling', icon: <MessageSquare/> },
        { id: 'katalogUMKM', title: 'Katalog UMKM Perempuan', icon: <ShoppingCart/> },
    ],
    NusaInovasi: [
        { id: 'panduanUsaha', title: 'Panduan Memulai Usaha', icon: <BookOpen/> },
        { id: 'etalaseProduk', title: 'Etalase Produk Digital', icon: <ShoppingCart/> },
    ],
    NusaBangun: [
        { id: 'laporKerusakan', title: 'Lapor Kerusakan Infrastruktur', icon: <Pencil/> },
        { id: 'lacakProgres', title: 'Lacak Progres Pembangunan', icon: <MapPin/> },
    ],
};

const nusaCerdasCurriculum = [
    { id: 'bhs_indo', title: 'Bahasa Indonesia', icon: <BookOpen />, color: 'blue', topics: ['Membaca cerita bergambar', 'Menyusun kalimat sederhana', 'Kosakata sehari-hari'] },
    { id: 'matematika', title: 'Matematika Dasar', icon: <Puzzle />, color: 'red', topics: ['Mengenal angka, bentuk, dan pola', 'Penjumlahan dan pengurangan', 'Permainan berhitung'] },
    { id: 'ipa', title: 'Ilmu Pengetahuan Alam', icon: <Sparkles />, color: 'green', topics: ['Mengenal hewan dan tumbuhan', 'Daur hidup', 'Cuaca dan lingkungan sekitar'] },
    { id: 'ips', title: 'Ilmu Pengetahuan Sosial', icon: <Users />, color: 'yellow', topics: ['Mengenal profesi', 'Lingkungan rumah dan sekolah', 'Kegiatan ekonomi sederhana'] },
    { id: 'ppkn', title: 'Pendidikan Pancasila', icon: <ShieldCheck />, color: 'purple', topics: ['Nilai gotong royong & toleransi', 'Simulasi kehidupan sosial', 'Perbedaan dan kesetaraan'] },
    { id: 'seni', title: 'Seni dan Kreativitas', icon: <Palette />, color: 'pink', topics: ['Menggambar & mewarnai', 'Bernyanyi dan bermain musik', 'Kerajinan tangan'] },
    { id: 'karakter', title: 'Pendidikan Karakter', icon: <HeartPulse />, color: 'teal', topics: ['Empati dan sopan santun', 'Edukasi anti-bullying', 'Menghargai perbedaan'] },
];

const mockNotificationsData = [
    { id: 1, category: 'Layanan', icon: <HeartPulse/>, color: 'green', title: 'Jadwal Konsultasi', text: 'Konsultasi Anda dengan Dr. Anisa akan dimulai dalam 15 menit.', time: 'Baru saja', isRead: false },
    { id: 2, category: 'Komunitas', icon: <Users/>, color: 'blue', title: 'Forum RT 05', text: 'Budi Santoso menanggapi laporan Anda tentang jalan rusak.', time: '5 menit lalu', isRead: false },
];

const homeQuickActions = [{ id: 'NusaSehat', icon: <HeartPulse className="w-8 h-8 mx-auto" />, label: "Konsultasi" }, { id: 'NusaCerdas', icon: <BookOpen className="w-8 h-8 mx-auto" />, label: "Belajar" }, { id: 'NusaInovasi', icon: <ShoppingCart className="w-8 h-8 mx-auto" />, label: "UMKM" }, { id: 'NusaBangun', icon: <Building className="w-8 h-8 mx-auto" />, label: "Lapor Desa" }, { id: 'Komunitas', icon: <Users className="w-8 h-8 mx-auto" />, label: "Agenda" }];
const communityPosts = [{ name: "Budi Santoso", role: "Ketua RT 05", time: "5 menit lalu", content: "Pengumuman: Akan diadakan kerja bakti pembersihan selokan pada hari Minggu jam 8 pagi. Diharapkan partisipasi seluruh warga. Terima kasih!" }, { name: "Siti Aminah", role: "Penggerak UMKM", time: "1 jam lalu", content: "Ada yang punya rekomendasi supplier bahan baku keripik singkong di area kita? Saya sedang butuh untuk produksi." }];

const forumWilayahPosts = [
    { id: 1, author: 'Budi Santoso', role: 'Ketua RT 05', avatar: 'https://i.pravatar.cc/150?u=budi', timestamp: '2 jam lalu', content: 'Selamat malam warga RT 05. Sekedar mengingatkan, iuran sampah bulan ini sudah bisa dibayarkan ke bendahara. Terima kasih atas perhatiannya.', likes: 15, comments: 2 },
    { id: 2, author: 'Karang Taruna', role: 'Organisasi Pemuda', avatar: 'https://i.pravatar.cc/150?u=karangtaruna', timestamp: '1 hari lalu', content: 'Ayo ramaikan! Lomba 17-an akan diadakan di lapangan desa minggu depan. Pendaftaran dibuka sampai hari Jumat. Ada panjat pinang, balap karung, dan banyak lagi!', likes: 45, comments: 12 },
];

const komunitasTematik = [
    { id: 'umkm', name: 'UMKM & Produk Lokal', icon: <ShoppingCart />, color: 'orange', members: 128, description: 'Berbagi tips, promosi, dan kolaborasi antar pelaku UMKM.' },
    { id: 'parenting', name: 'Kesehatan Keluarga & Parenting', icon: <HeartPulse />, color: 'pink', members: 256, description: 'Diskusi seputar tumbuh kembang anak dan kesehatan keluarga.' },
    { id: 'gender', name: 'Pemberdayaan Perempuan', icon: <Scale />, color: 'purple', members: 98, description: 'Ruang aman untuk berbagi cerita dan saling mendukung.' },
    { id: 'inovasi', name: 'Inovasi Desa', icon: <Lightbulb />, color: 'yellow', members: 72, description: 'Wadah ide dan gagasan untuk memajukan desa bersama.' },
];

const agendaLokal = [
    { id: 1, title: 'Posyandu Bulanan RW 02', date: '15 Juni 2025', time: '08:00 - 11:00 WIB', location: 'Balai RW 02', category: 'Kesehatan' },
    { id: 2, title: 'Gotong Royong Bersih Desa', date: '18 Juni 2025', time: '07:30 WIB - Selesai', location: 'Lapangan Desa', category: 'Komunitas' },
    { id: 3, title: 'Pelatihan Membuat Pupuk Kompos', date: '22 Juni 2025', time: '13:00 - 15:00 WIB', location: 'Rumah Kaca Desa', category: 'Pelatihan' },
];

const laporanWarga = [
    { id: 1, title: 'Jalan berlubang di depan Gang Mawar', status: 'Ditinjau', upvotes: 58, author: 'Siti Aminah', timestamp: '3 hari lalu' },
    { id: 2, title: 'Lampu jalan di pertigaan mati', status: 'Selesai', upvotes: 112, author: 'Eko Widodo', timestamp: '1 minggu lalu' },
    { id: 3, title: 'Tumpukan sampah liar di pinggir sungai', status: 'Ditinjau', upvotes: 25, author: 'Rina Hartati', timestamp: '2 jam lalu' },
];

// --- Komponen Tambahan (Modals, Detail Pages) ---

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 flex-shrink-0">
                   <h2 className="font-poppins font-bold text-xl">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                   {children}
                </div>
            </div>
        </div>
    );
};

const FeatureContent = ({ featureId }) => {
    // This is a placeholder for other service features.
    // In a real app, this would have specific content for each feature.
    return <div>Konten untuk {featureId}</div>; 
};

const SubjectDetailModalContent = ({ subject }) => {
    const colorClass = `text-${subject.color}-500`;
    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-poppins text-lg font-bold mb-3">Topik Pembelajaran</h3>
                <ul className="space-y-2">
                    {subject.topics.map((topic, index) => (
                        <li key={index} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <CheckCircle size={20} className={colorClass} />
                            <span>{topic}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="font-poppins text-lg font-bold mb-3">Fitur Pendukung</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                    <span className="flex items-center gap-1 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full"><Mic size={14}/> Audio Deskripsi</span>
                    <span className="flex items-center gap-1 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full"><Hand size={14}/> Bahasa Isyarat</span>
                    <span className="flex items-center gap-1 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full"><Languages size={14}/> Teks Besar</span>
                </div>
            </div>
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                <Star size={20}/> Mulai Tantangan Belajar!
            </button>
        </div>
    )
};

const ServiceDetailPage = ({ serviceId, onBack }) => {
    const service = featuredServices.find(s => s.id === serviceId);
    const [activeModal, setActiveModal] = useState(null);
    const openModal = (modalInfo) => setActiveModal(modalInfo);
    if (!service) return <div>Layanan tidak ditemukan</div>;

    if (serviceId === 'NusaCerdas') {
        return <NusaCerdasPage onBack={onBack} service={service} />;
    }
    
    const features = serviceFeatures[serviceId] || [];
    return (
        <div className="py-6 animate-fadeIn">
            <button onClick={onBack} className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 mb-4">
                <ArrowLeft size={20} /> Kembali ke Layanan
            </button>
            <div className={`p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800`}>
                 <div className="flex items-center gap-4 mb-6 pb-6 border-b dark:border-gray-700">
                    {React.cloneElement(service.icon, { size: 48, className: `text-${service.color}-500` })}
                    <div>
                       <h1 className="font-poppins text-3xl font-bold text-gray-800 dark:text-gray-100">{service.title}</h1>
                       <p className="text-gray-600 dark:text-gray-400">{service.desc}</p>
                    </div>
                </div>
                <h2 className="font-poppins text-xl font-bold mb-4">Fitur Utama</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map(feature => (
                        <button key={feature.id} onClick={() => openModal({ type: 'feature', data: feature })} className="w-full text-left bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-4 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-3">
                            {React.cloneElement(feature.icon, { className: `text-${service.color}-500 flex-shrink-0`})}
                            <span>{feature.title}</span>
                        </button>
                    ))}
                </div>
            </div>
            <Modal isOpen={activeModal?.type === 'feature'} onClose={() => setActiveModal(null)} title={activeModal?.data.title}>
                {activeModal?.type === 'feature' && <FeatureContent featureId={activeModal.data.id} />}
            </Modal>
        </div>
    );
};

const NusaCerdasPage = ({ onBack, service }) => {
    const [activeModal, setActiveModal] = useState(null);
    const openModal = (modalInfo) => setActiveModal(modalInfo);
    const colorClasses = { blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600', red: 'bg-red-100 dark:bg-red-900 text-red-600', green: 'bg-green-100 dark:bg-green-900 text-green-600', yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600', purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600', pink: 'bg-pink-100 dark:bg-pink-900 text-pink-600', teal: 'bg-teal-100 dark:bg-teal-900 text-teal-600' };

    return (
        <div className="py-6 animate-fadeIn">
            <button onClick={onBack} className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 mb-4">
                <ArrowLeft size={20} /> Kembali ke Layanan
            </button>
            <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b dark:border-gray-700">
                    {React.cloneElement(service.icon, { size: 48, className: `text-blue-500` })}
                    <div>
                       <h1 className="font-poppins text-3xl font-bold text-gray-800 dark:text-gray-100">Pendidikan Untuk Semua</h1>
                       <p className="text-gray-600 dark:text-gray-400">Pilih mata pelajaran untuk mulai belajar dengan seru!</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {nusaCerdasCurriculum.map(subject => (
                        <button key={subject.id} onClick={() => openModal({ type: 'subject', data: subject })} 
                            className={`p-4 rounded-xl text-center font-semibold transition-transform hover:scale-105 ${colorClasses[subject.color]}`}>
                            {React.cloneElement(subject.icon, { size: 32, className: 'mx-auto mb-2' })}
                            {subject.title}
                        </button>
                    ))}
                </div>
            </div>
            <Modal isOpen={activeModal?.type === 'subject'} onClose={() => setActiveModal(null)} title={activeModal?.data.title}>
                {activeModal?.type === 'subject' && <SubjectDetailModalContent subject={activeModal.data} />}
            </Modal>
        </div>
    );
};


// --- Komponen Aplikasi Utama ---
const SplashScreen = () => (
    <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-[100] animate-fadeOut">
        <div className="text-center">
            <h1 className="font-poppins text-5xl md:text-6xl font-extrabold text-gray-800">NusaCare</h1>
            <p className="mt-4 text-lg text-gray-600">Satu Aplikasi, Banyak Solusi untuk Indonesia Berkelanjutan</p>
        </div>
    </div>
);

const PreLogin = ({ onLogin, setModal }) => (
    <div className="bg-gray-50 text-gray-800">
        <header className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-80"></div>
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 p-4">
                <h1 className="font-poppins text-4xl md:text-6xl font-extrabold leading-tight">Membangun Masa Depan Indonesia, Bersama-sama.</h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Satu ekosistem digital untuk kesehatan, pendidikan, ekonomi, dan pembangunan.</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => setModal('login')} className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                        Mulai Sekarang
                    </button>
                    <button onClick={() => onLogin(true, 'Tamu')} className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                        Jelajahi Dulu
                    </button>
                </div>
            </div>
        </header>

        <main className="container mx-auto px-4 py-16 space-y-20">
            <section>
                <h2 className="font-poppins text-3xl font-bold text-center mb-12">Bergabung dengan Ekosistem NusaCare</h2>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <h3 className="font-poppins text-2xl font-bold text-center mb-6">Login Sebagai</h3>
                        <div className="space-y-4">
                           {['Pengguna Umum', 'Guru / Mentor', 'UMKM', 'Perwakilan Desa'].map(role => (
                               <button key={role} onClick={() => onLogin(true, role)} className="w-full text-left bg-gray-100 hover:bg-blue-100 p-4 rounded-lg font-semibold transition-colors duration-300 flex items-center">
                                   <ArrowRight className="w-5 h-5 mr-3 text-blue-500"/> {role}
                               </button>
                           ))}
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <h3 className="font-poppins text-2xl font-bold text-center mb-6">Daftar Sekarang</h3>
                         <div className="space-y-4">
                           {['Email', 'Nomor HP', 'NIK'].map(method => (
                               <button key={method} onClick={() => setModal('register')} className="w-full text-left bg-gray-100 hover:bg-green-100 p-4 rounded-lg font-semibold transition-colors duration-300 flex items-center">
                                   <ArrowRight className="w-5 h-5 mr-3 text-green-500"/> Daftar dengan {method}
                               </button>
                           ))}
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <button onClick={() => onLogin(true, 'Tamu')} className="text-gray-600 hover:text-blue-600 font-semibold">Jelajahi Sebagai Tamu &rarr;</button>
                </div>
            </section>
        </main>
        <footer className="bg-gray-800 text-white py-8 text-center">&copy; 2024 NusaCare.</footer>
    </div>
);


const PostLogin = ({ userRole, onLogout }) => {
    const [activeTab, setActiveTab] = useState('Beranda');
    const [theme, setTheme] = useState('light');
    const [pageState, setPageState] = useState({ page: 'Beranda', params: {} });
    const [modal, setModal] = useState(null);
    const [notifications, setNotifications] = useState(mockNotificationsData);
    
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const navigateTo = (page, params = {}) => {
        setPageState({ page, params });
        if (['Beranda', 'Layanan', 'Komunitas', 'Notifikasi', 'Profil'].includes(page)) {
            setActiveTab(page);
        }
    };

    const handleQuickAction = (id) => {
        if (id === 'Komunitas') {
            navigateTo('Komunitas');
        } else {
            navigateTo('ServiceDetail', { serviceId: id });
        }
    };
    
    const renderContent = () => {
        const { page, params } = pageState;
        switch (page) {
            case 'Beranda': return <HomePage userRole={userRole} onQuickAction={handleQuickAction} setModal={setModal} />;
            case 'Layanan': return <ServicesPage onServiceSelect={(serviceId) => navigateTo('ServiceDetail', { serviceId })} />;
            case 'ServiceDetail': return <ServiceDetailPage serviceId={params.serviceId} onBack={() => navigateTo('Layanan')} />;
            case 'Komunitas': return <CommunityPage setModal={setModal} />;
            case 'Notifikasi': return <NotificationPage notifications={notifications} setNotifications={setNotifications} />;
            case 'Profil': return <ProfilePage toggleTheme={toggleTheme} currentTheme={theme} onLogout={onLogout} userRole={userRole} />;
            default: return <HomePage userRole={userRole} />;
        }
    };

    return (
        <div className={`${theme === 'dark' ? 'dark' : ''}`}>
             <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen font-inter pb-24">
                <div className="container mx-auto px-4">{renderContent()}</div>
                <BottomNavBar activeTab={activeTab} setActiveTab={(tab) => navigateTo(tab)} unreadCount={unreadCount} />
                <Modal isOpen={modal === 'promo'} onClose={() => setModal(null)} title="Detail Vaksinasi Massal">
                    <p>Program vaksinasi Polio untuk Balita akan diselenggarakan serentak di seluruh Balai Desa pada hari Sabtu, 28 Desember 2024, pukul 08:00 - 12:00. Program ini gratis dan tidak dipungut biaya. Mohon membawa kartu identitas anak atau Kartu Keluarga. Mari sukseskan Indonesia Sehat!</p>
                </Modal>
                <Modal isOpen={modal === 'compose'} onClose={() => setModal(null)} title="Tulis Postingan Baru">
                    <textarea className="w-full h-32 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700" placeholder="Apa yang Anda pikirkan?"></textarea>
                    <button className="w-full mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Kirim</button>
                </Modal>
            </div>
        </div>
    );
};

const HomePage = ({ userRole, onQuickAction, setModal }) => {
    const roleIcons = {'Pengguna Umum': <HeartPulse/>, 'Guru / Mentor': <GraduationCap/>, 'UMKM': <Briefcase/>, 'Perwakilan Desa': <Building/>, 'Tamu': <User/>};

    return (
        <div className="py-6 space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-poppins text-2xl font-bold">Selamat datang, {userRole === 'Tamu' ? 'Tamu' : 'Vincent'}!</h1>
                    <p className="text-gray-500 dark:text-gray-400">Apa yang ingin kamu lakukan hari ini?</p>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow">
                    {React.cloneElement(roleIcons[userRole], {className: 'w-6 h-6 text-blue-500'})}
                    <span className="text-sm font-semibold hidden sm:inline">{userRole}</span>
                </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center">
                {homeQuickActions.map(action => (
                    <button key={action.label} onClick={() => onQuickAction(action.id)} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer disabled:opacity-50" disabled={userRole === 'Tamu'}>
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full inline-block">
                           {action.icon}
                        </div>
                        <p className="mt-2 text-xs sm:text-sm font-semibold">{action.label}</p>
                    </button>
                ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
                <div>
                    <h3 className="font-poppins font-bold text-lg">Jadwal Vaksinasi Massal</h3>
                    <p className="text-sm">Vaksinasi Polio untuk Balita, gratis di Balai Desa!</p>
                </div>
                <button onClick={() => setModal('promo')} className="bg-white text-blue-600 font-bold py-2 px-4 rounded-full text-sm flex-shrink-0">Lihat Detail</button>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                     <h3 className="font-poppins text-lg font-bold mb-4">Forum Komunitas</h3>
                     {communityPosts.slice(0, 1).map(post => (
                           <div key={post.name} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                               <p className="text-sm">{post.content}</p>
                           </div>
                        ))}
                     <button onClick={() => setModal('compose')} className="w-full mt-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg font-semibold transition-colors disabled:opacity-50" disabled={userRole === 'Tamu'}>Tulis Sesuatu...</button>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                    <h3 className="font-poppins text-lg font-bold mb-4">Rekomendasi Untukmu</h3>
                    <p className="text-sm text-gray-500">Fitur rekomendasi personal akan segera hadir.</p>
                </div>
            </div>
        </div>
    );
};

const ServicesPage = ({ onServiceSelect }) => {
    return (
        <div className="py-6 animate-fadeIn">
            <h1 className="font-poppins text-3xl font-bold mb-8 text-center">Pusat Layanan NusaCare</h1>
            <div className="grid grid-cols-2 gap-6">
                {featuredServices.map(service => (
                    <button key={service.id} onClick={() => onServiceSelect(service.id)} className={`p-6 rounded-2xl shadow-md text-center flex flex-col items-center justify-center cursor-pointer bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow`}>
                        <div className={`p-4 rounded-full mb-4 bg-${service.color}-100 dark:bg-${service.color}-900`}>
                            {React.cloneElement(service.icon, {size: 32})}
                        </div>
                        <p className={`font-poppins font-bold text-lg text-gray-800 dark:text-gray-200`}>{service.id}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

const CommunityPage = ({ setModal }) => {
    const [activeTab, setActiveTab] = useState('Forum Wilayah');
    const tabs = ['Forum Wilayah', 'Komunitas Tematik', 'Agenda Lokal', 'Laporan Warga'];

    const renderCommunityContent = () => {
        switch (activeTab) {
            case 'Forum Wilayah':
                return (
                    <div className="space-y-4">
                        {forumWilayahPosts.map(post => (
                            <div key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-bold">{post.author}</p>
                                        <p className="text-xs text-gray-500">{post.role} &bull; {post.timestamp}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">{post.content}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <button className="flex items-center gap-1 hover:text-blue-500"><ThumbsUp size={16} /> {post.likes}</button>
                                    <button className="flex items-center gap-1 hover:text-blue-500"><MessageCircle size={16} /> {post.comments}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'Komunitas Tematik':
                const colorClasses = {
                    orange: 'bg-orange-100 text-orange-600', pink: 'bg-pink-100 text-pink-600',
                    purple: 'bg-purple-100 text-purple-600', yellow: 'bg-yellow-100 text-yellow-600',
                };
                return (
                     <div className="space-y-4">
                        {komunitasTematik.map(kom => (
                            <div key={kom.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${colorClasses[kom.color]}`}>
                                   {React.cloneElement(kom.icon, { size: 24 })}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold">{kom.name}</h4>
                                    <p className="text-xs text-gray-500">{kom.members} anggota</p>
                                </div>
                                <button className="bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-full">Gabung</button>
                            </div>
                        ))}
                    </div>
                );
            case 'Agenda Lokal':
                 return (
                     <div className="space-y-4">
                        {agendaLokal.map(agenda => (
                            <div key={agenda.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                                <p className={`text-xs font-bold text-green-500`}>{agenda.category.toUpperCase()}</p>
                                <h4 className="font-bold text-lg my-1">{agenda.title}</h4>
                                <p className="text-sm text-gray-500">{agenda.date} &bull; {agenda.time}</p>
                                <p className="text-sm text-gray-500">{agenda.location}</p>
                            </div>
                        ))}
                    </div>
                );
             case 'Laporan Warga':
                return (
                     <div className="space-y-4">
                        {laporanWarga.map(laporan => (
                            <div key={laporan.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                       <h4 className="font-bold">{laporan.title}</h4>
                                       <p className="text-xs text-gray-500">Oleh {laporan.author} &bull; {laporan.timestamp}</p>
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${laporan.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{laporan.status}</span>
                                </div>
                                <div className="mt-3 pt-3 border-t dark:border-gray-700 flex items-center justify-end gap-2">
                                    <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-sm font-semibold">
                                        <ThumbsUp size={14}/> {laporan.upvotes}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default: return null;
        }
    }

    return (
        <div className="py-6 animate-fadeIn">
            <h1 className="font-poppins text-3xl font-bold mb-4 text-center">Ruang Komunitas</h1>
             <div className="sticky top-0 bg-gray-100 dark:bg-gray-900 py-2 z-10">
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-1 flex space-x-1">
                        {tabs.map(tab => (
                            <button key={tab} 
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === tab ? 'bg-white dark:bg-gray-900 text-blue-600 shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {renderCommunityContent()}
        </div>
    );
};

const NotificationPage = ({ notifications, setNotifications }) => {
    const [activeFilter, setActiveFilter] = useState('Semua');
    
    const handleMarkAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const handleDeleteAll = () => {
        setNotifications([]);
    };

    const filteredNotifications = notifications.filter(n => 
        activeFilter === 'Semua' || n.category === activeFilter
    );

    const colorClasses = {
        green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
        blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
        yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300',
        purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300',
        gray: 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300',
    };

    return (
        <div className="py-6 animate-fadeIn">
            <h1 className="font-poppins text-3xl font-bold mb-4 text-center">Notifikasi</h1>
            
            <div className="flex justify-center mb-6">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-1 flex space-x-1">
                    {['Semua', 'Layanan', 'Komunitas', 'Sistem'].map(filter => (
                        <button key={filter} 
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors ${activeFilter === filter ? 'bg-white dark:bg-gray-900 text-blue-600 shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center mb-4 text-sm">
                <button onClick={handleMarkAllRead} className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                    <MailCheck size={16}/> Tandai semua dibaca
                </button>
                <button onClick={handleDeleteAll} className="flex items-center gap-2 font-semibold text-red-500 dark:text-red-400">
                    <Trash2 size={16}/> Hapus semua
                </button>
            </div>

            <div className="space-y-4">
                {filteredNotifications.length > 0 ? filteredNotifications.map(notif => (
                    <div key={notif.id} onClick={() => handleMarkAsRead(notif.id)} className={`p-4 rounded-xl shadow-md cursor-pointer transition-colors ${notif.isRead ? 'bg-white dark:bg-gray-800 opacity-60' : 'bg-blue-50 dark:bg-blue-900/30'}`}>
                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full ${colorClasses[notif.color]}`}>
                                {React.cloneElement(notif.icon, {size: 20})}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold">{notif.title}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{notif.text}</p>
                                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                            </div>
                            {!notif.isRead && <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>}
                        </div>
                    </div>
                )) : (
                     <div className="text-center py-10 text-gray-500">
                        <p>Tidak ada notifikasi di kategori ini.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const ProfileSection = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full p-4 text-left flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="font-semibold">{title}</span>
                </div>
                <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="p-4 border-t dark:border-gray-700 animate-fadeIn">{children}</div>}
        </div>
    );
};

const ProfilePage = ({ toggleTheme, currentTheme, onLogout, userRole }) => {
    return (
        <div className="py-6 space-y-6 animate-fadeIn">
            {/* Header Profil */}
            <div className="flex flex-col items-center text-center">
                <div className="relative">
                    <img src={`https://source.unsplash.com/150x150/?rock,stone`} alt="Foto profil batu" className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-lg object-cover" />
                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full border-2 border-white dark:border-gray-800">
                        <Edit size={14} />
                    </button>
                </div>
                <h2 className="font-poppins text-2xl font-bold mt-4">Vincent</h2>
                <p className="text-gray-500 dark:text-gray-400">{userRole}</p>
            </div>
            
            {/* Sections */}
            <div className="space-y-4">
                <ProfileSection title="Portofolio Digital & Aktivitas" icon={<Briefcase size={20} className="text-blue-500"/>}>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><BarChart2 size={16}/> Statistik Penggunaan</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <p>Kelas Selesai: <strong>12</strong></p>
                                <p>Poin Gotong Royong: <strong>1,250</strong></p>
                                <p>Laporan Dibuat: <strong>5</strong></p>
                                <p>Diskusi Diikuti: <strong>28</strong></p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><Award size={16}/> Lencana & Pencapaian</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Pelajar Aktif', 'Pejuang Kesehatan', 'Penggerak Komunitas'].map(badge => (
                                    <span key={badge} className="text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 py-1 px-2 rounded-full">{badge}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><FileText size={16}/> Sertifikat Digital</h4>
                            <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Sertifikat "Dasar Pemasaran Digital".pdf</a>
                        </div>
                    </div>
                </ProfileSection>

                <ProfileSection title="Riwayat Layanan" icon={<History size={20} className="text-green-500"/>}>
                    <ul className="space-y-2 text-sm list-disc list-inside">
                        <li>Konsultasi dengan Dr. Anisa (10/12/2024)</li>
                        <li>Mengikuti kelas "Manajemen Keuangan UMKM"</li>
                        <li>Laporan "Lampu jalan mati di RT 03" (Selesai)</li>
                    </ul>
                </ProfileSection>

                <ProfileSection title="Keamanan & Pengaturan" icon={<Settings size={20} className="text-gray-500"/>}>
                     <div className="space-y-3">
                        <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Ganti Kata Sandi</button>
                        <div className="flex justify-between items-center p-2">
                            <span>Mode Gelap</span>
                            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                        </div>
                         <button onClick={onLogout} className="w-full p-2 text-left text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/50 rounded-md">
                            Keluar dari Akun
                        </button>
                    </div>
                </ProfileSection>
            </div>
        </div>
    );
};


const BottomNavBar = ({ activeTab, setActiveTab, unreadCount }) => {
    const navItems = [{ name: 'Beranda', icon: <Home /> }, { name: 'Layanan', icon: <Briefcase /> }, { name: 'Komunitas', icon: <Users /> }, { name: 'Notifikasi', icon: <Bell /> }, { name: 'Profil', icon: <User /> }];
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
            <div className="flex justify-around h-20">
                {navItems.map(item => (
                    <button key={item.name} onClick={() => setActiveTab(item.name)} className={`flex flex-col items-center justify-center w-full transition-colors duration-300 ${activeTab === item.name ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        <div className="relative">
                           {item.icon}
                           {item.name === 'Notifikasi' && unreadCount > 0 && (
                               <span className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center border-2 border-white dark:border-gray-800">
                                   {unreadCount}
                               </span>
                           )}
                        </div>
                        <span className="text-xs mt-1">{item.name}</span>
                        {activeTab === item.name && <div className="w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-full mt-1"></div>}
                    </button>
                ))}
            </div>
        </nav>
    );
};


export default function App() {
    const [showSplash, setShowSplash] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('Pengguna Umum');
    const [modal, setModal] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 500); // Shortened for dev
        return () => clearTimeout(timer);
    }, []);
    
    const handleLogin = (status, role) => {
        setUserRole(role);
        setIsLoggedIn(status);
        setModal(null);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole('Pengguna Umum');
    };

    if (showSplash) return <SplashScreen />;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700,800&family=Inter:wght@400;500;600&display=swap');
                body { font-family: 'Inter', sans-serif; }
                .font-poppins { font-family: 'Poppins', sans-serif; }
                .animate-fadeOut { animation: fadeOut 1s ease-in-out 0.5s forwards; }
                .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; visibility: hidden; } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
            
            {isLoggedIn ? (
                <PostLogin userRole={userRole} onLogout={handleLogout} />
            ) : (
                <>
                    <PreLogin onLogin={handleLogin} setModal={setModal} />
                    <Modal isOpen={modal === 'login'} onClose={() => setModal(null)} title="Login">
                        <p className="text-center mb-4">Pilih peran Anda untuk melanjutkan:</p>
                        <div className="space-y-3">
                           {['Pengguna Umum', 'Guru / Mentor', 'UMKM', 'Perwakilan Desa'].map(role => (
                               <button key={role} onClick={() => handleLogin(true, role)} className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition-colors duration-300">
                                   Login sebagai {role}
                               </button>
                           ))}
                        </div>
                    </Modal>
                     <Modal isOpen={modal === 'register'} onClose={() => setModal(null)} title="Daftar">
                        <p className="text-center">Fitur pendaftaran sedang dalam pengembangan.</p>
                    </Modal>
                </>
            )}
        </>
    );
}
