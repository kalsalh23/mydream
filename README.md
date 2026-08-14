# قفل إلكتروني بواسطة بصمة الإصبع والصوت — منصة مشروع التخرج

منصة ويب تفاعلية احترافية لمشروع تخرج عربي RTL، مصمّمة بهوية فاخرة (أسود داكن + ذهبي + كريمي) ومرتبطة بباركود QR على بطاقة التخرج.

- **الموقع**: تم نشره على Vercel
- **المتعة التقنية**: React.js + Supabase + GitHub + Vercel

---

## ✨ ماذا يقدم الموقع؟

| الميزة | الوصف |
|---|---|
| شاشة ترحيب | يكتب الزائر اسمه، فيُحفظ الاسم + التاريخ + عدد الزيارات في Supabase دون حساب |
| واجهة واحدة | 18 قسمًا: Hero، الفكرة، الفريق، المشرفون، المشكلة، الأهمية، الأهداف، المكونات، آلية العمل، مخطط النظام، المميزات، الجانب البرمجي/الإلكتروني، المراحل، الاختبارات، المعرض، الملفات، الخاتمة |
| لوحة إدارة | تعديل كل المحتوى، إدارة الفريق والمشرفين والمكونات، رفع صور/فيديو/PDF، ومشاهدة الزوار |
| أمان | RLS + Auth للمدير + حماية مسار /admin + إخفاء المفاتيح |

---

## 🚀 التشغيل محليًا

### 1) المتطلبات
- Node.js 18+
- حساب Supabase
- حساب GitHub + Vercel (للنشر)

### 2) تثبيت الحزم
```bash
npm install
```

### 3) ملف البيئة
أنشئ ملف `.env` من القالب:
```bash
copy .env.example .env
```
ثم ضع القيم:
```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=<الـ anon key>
```

### 4) التشغيل
```bash
npm run dev
```
افتح `http://localhost:5173`

### 5) البناء للإنتاج
```bash
npm run build && npm run preview
```

---

## 🗄️ إعداد قاعدة بيانات Supabase

1. أنشئ مشروعًا جديدًا في [supabase.com](https://supabase.com).
2. افتح **SQL Editor** ونفّذ ملف `supabase/schema.sql` كاملًا.
3. نفّذ ملف `supabase/seed.sql` لملء بيانات تجريبية للمشروع.
4. في **Authentication → Providers** فعّل البريد، وفي **Settings** فعّل `Confirm email` أو اتركه وفقًا لرغبتك.
5. أنشئ **Storage bucket** باسم `media` بصيغة `public` (يقوم schema.sql بإنشائه تلقائيًا).

### إنشاء حساب المدير
1. من لوحة تحكم Supabase: **Authentication → Users → Add user** أنشئ مستخدمًا بالبريد وكلمة المرور.
2. انسخ `id` (UUID) الخاص بالمستخدم.
3. نفّذ في SQL Editor:
```sql
insert into public.admin_profiles (id, is_admin) values ('<uuid المستخدم>', true);
```
> لا يمكن للموقع الدخول إلى لوحة الإدارة إلا عبر حساب مدرج في `admin_profiles`.

### الجداول
`visitors` • `project_settings` • `team_members` • `supervisors` • `components` • `features` • `stages` • `media` • `documents` • `admin_profiles`

### S3 / Storage
- كل الصور والملفات في bucket `media` (عام للقراءة، إدارة فقط للمدير).

---

## 🔐 الأمان المعتمد

- **RLS** مفعّل على كل الجداول: قراءة عامة، وكتابة للمدير فقط عبر دالة `public.is_admin()`.
- **Service Role Key** لا يُستخدم إطلاقًا في الواجهة، بل موجود فقط في بيئتك.
- مسار `/admin` محمي على مستوى التطبيق (يُفحص `admin_profiles`).
- المفاتيح السريّة مخزّنة في متغيرات البيئة فقط (`VITE_SUPABASE_*`).

---

## ☁️ النشر على Vercel

### عن طريق Git (موصى به)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:USERNAME/REPO.git
git push -u origin main
```

ثم:
1. افتح [vercel.com](https://vercel.com) سجّل الدخول بحساب GitHub.
2. **New Project → Import** اختر المستودع.
3. في الإعدادات أضف المتغيرات:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. اضغط **Deploy**.

> بعد أي تحديث: `git push` وسيتحدث الموقع تلقائيًا.

---

## 📁 هيكل المشروع

```
src/
├─ App.jsx                  # التوجيه والمقدمات
├─ main.jsx                 # نقطة الدخول
├─ index.css                # الهوية البصرية الكاملة
├─ lib/supabase.js          # عميل Supabase
├─ context/                 # سياق البيانات والزوار
├─ data/defaults.js         # المحتوى الافتراضي للموقع
├─ components/
│  ├─ Welcome.jsx           # شاشة الترحيب
│  ├─ Navbar.jsx / Footer.jsx
│  └─ sections/             # 18 قسمًا
└─ pages/
   ├─ Home.jsx              # الواجهة الأساسية
   ├─ AdminLogin.jsx        # تسجيل دخول المدير
   └─ AdminDashboard.jsx    # لوحة الإدارة
supabase/
├─ schema.sql               # الجداول + السياسات + RLS
└─ seed.sql                 # البيانات التجريبية
```

---

## 🛠️ ملاحظات على المحتوى التقني (تؤكَّد من فريق المشروع)

- **HC-06** وحدة Bluetooth للاتصال فقط؛ التعرف الصوتي يتم عبر الهاتف/تطبيق خارجي (كما هو موضح في المخطط). يمكن إضافة وحدة تعرف صوتي مستقلة من لوحة الإدارة عند اعتمادها.
- قسم **المكونات** قابل للتعديل/الإضافة من لوحة الإدارة بحسب المكونات الفعلية.
- نسب النجاح والأرقام لم تُدرج في الاختبارات حتى يضيفها الفريق.

## 🏗️ التقنيات

React 19 • Vite • react-router-dom • Supabase JS • CSS3 (هوية كاملة بدون مكتبات خارجية)

---

صُنعت هذه المنصة خصيصًا لفريق المشروع مع اسم المطوّر يظهر في تذييل الموقع.