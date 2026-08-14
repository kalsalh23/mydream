import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { supabase } from '../lib/supabase'
import { useToast } from '../components/Toast'
import { Icon } from '../components/Icon'
import { DEFAULT_SETTINGS } from '../data/defaults'

const TABS = [
  { key: 'overview', label: 'نظرة عامة' },
  { key: 'settings', label: 'إعدادات المشروع' },
  { key: 'team', label: 'الفريق' },
  { key: 'supervisors', label: 'المشرفون' },
  { key: 'components', label: 'المكونات' },
  { key: 'features', label: 'المميزات' },
  { key: 'stages', label: 'المراحل' },
  { key: 'media', label: 'الوسائط' },
  { key: 'documents', label: 'الملفات' },
  { key: 'visitors', label: 'الزوار' },
]

function useFiles() {
  const [busy, setBusy] = useState(false)
  const upload = async (file) => {
    if (!file) return ' '
    setBusy(true)
    const path = `uploads/${Date.now()}_${file.name.replace(/[^\w.-]/g, '_')}`
    const { data, error } = await supabase.storage.from('media').upload(path, file, { upsert: false })
    setBusy(false)
    if (error) throw new Error(error.message)
    return supabase.storage.from('media').getPublicUrl(data.path).data.publicUrl
  }
  return { upload, busy }
}

export default function AdminDashboard() {
  const nav = useNavigate()
  const { reload } = useData()
  const [tab, setTab] = useState('overview')
  const [visitors, setVisitors] = useState([])
  const [stats, setStats] = useState({ total: 0, today: 0 })

  useEffect(() => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    supabase
      .from('visitors')
      .select('*')
      .order('last_visit', { ascending: false })
      .limit(200)
      .then(({ data }) => {
        if (data) {
          setVisitors(data)
          setStats({
            total: data.length,
            today: data.filter((v) => new Date(v.last_visit) >= start).length,
          })
        }
      })
  }, [tab])

  const logout = async () => {
    await supabase.auth.signOut()
    nav('/admin/login')
  }

  return (
    <div className="dash">
      <div className="dash-topbar">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="shield" size={20} /> <span className="text-gold">لوحة الإدارة</span>
        </h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-sm btn-ghost" onClick={() => nav('/')}>عرض الموقع</button>
          <button className="btn btn-sm btn-danger" onClick={logout}>خروج</button>
        </div>
      </div>
      <div className="dash-tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`dash-tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="dash-body">
        {tab === 'overview' && <Overview stats={stats} visitors={visitors} reload={reload} />}
        {tab === 'settings' && <SettingsEditor onSaved={reload} />}
        {tab === 'team' && <CollectionEditor table="team_members" fields={['name', 'role', 'bio', 'image_url']} title="أعضاء الفريق" onSaved={reload} />}
        {tab === 'supervisors' && <CollectionEditor table="supervisors" fields={['name', 'academic_title', 'image_url']} title="المشرفون" onSaved={reload} />}
        {tab === 'components' && <CollectionEditor table="components" fields={['name', 'model', 'description', 'image_url']} title="المكونات" onSaved={reload} />}
        {tab === 'features' && <CollectionEditor table="features" fields={['title', 'description', 'icon']} title="المميزات" onSaved={reload} />}
        {tab === 'stages' && <CollectionEditor table="stages" fields={['number', 'title', 'description']} title="مراحل التنفيذ" numeric={['number']} onSaved={reload} />}
        {tab === 'media' && <MediaEditor onSaved={reload} />}
        {tab === 'documents' && <CollectionEditor table="documents" fields={['title', 'file_url', 'file_type']} title="ملفات المشروع" onSaved={reload} storage />
        }
        {tab === 'visitors' && <VisitorsView visitors={visitors} />}
      </div>
    </div>
  )
}

function Overview({ stats, visitors, reload }) {
  return (
    <>
      <h3 className="dash-section-title">نظرة عامة على الموقع</h3>
      {!import.meta.env.VITE_ADMIN_EMAIL && (
        <div className="notice">💡 أضف VITE_ADMIN_EMAIL في ملف البيئة لتظهر تعليمات إنشاء حساب المدير.</div>
      )}
      <div className="stat-grid">
        <div className="card stat-card"><div className="num">{stats.total}</div><div className="lbl">إجمالي الزيارات</div></div>
        <div className="card stat-card"><div className="num">{stats.today}</div><div className="lbl">زيارات اليوم</div></div>
        <div className="card stat-card"><div className="num">{visitors.length}</div><div className="lbl">زوار مسجّلون</div></div>
      </div>
      <div className="notice">محتوى الموقع يُجلب مباشرة من قاعدة البيانات، وأي تعديل هنا يظهر فورًا في الموقع.</div>
      <button className="btn btn-sm" onClick={reload}>إعادة تحميل البيانات</button>
    </>
  )
}

function SettingsEditor({ onSaved }) {
  const { settings } = useData()
  const toast = useToast()
  const [form, setForm] = useState({ ...DEFAULT_SETTINGS, ...settings })
  const [saving, setSaving] = useState(false)
  const [arr, setArr] = useState({
    importance: [...(form.importance || [])],
    goals: [...(form.goals || [])],
    software: [...(form.software || [])],
  })

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const addItem = (key) => {
    const val = prompt('أضف عنصرًا جديدًا:')
    if (val && val.trim()) setArr((a) => ({ ...a, [key]: [...a[key], val.trim()] }))
  }
  const removeItem = (key, i) => setArr((a) => ({ ...a, [key]: a[key].filter((_, j) => j !== i) }))
  const editItem = (key, i) => {
    const val = prompt('عدّل العنصر:', arr[key][i])
    if (val && val.trim()) setArr((a) => ({ ...a, [key]: a[key].map((x, j) => (j === i ? val.trim() : x)) }))
  }

  const save = async () => {
    setSaving(true)
    const payload = {
      ...form,
      importance: arr.importance,
      goals: arr.goals,
      software: arr.software,
      updated_at: new Date().toISOString(),
    }
    const { error } = await supabase
      .from('project_settings')
      .update(payload)
      .eq('id', '00000000-0000-0000-0000-000000000001')
    setSaving(false)
    if (error) {
      toast('حدث خطأ أثناء الحفظ')
      return
    }
    toast('تم حفظ الإعدادات')
    onSaved()
  }

  return (
    <>
      <h3 className="dash-section-title">إعدادات المشروع</h3>
      <div className="dash-card">
        <h3>المعلومات الأساسية</h3>
        <div className="field"><label>اسم المشروع</label><input value={form.project_name} onChange={(e) => set('project_name', e.target.value)} /></div>
        <div className="field"><label>العنوان المختصر</label><input value={form.short_title} onChange={(e) => set('short_title', e.target.value)} /></div>
        <div className="field"><label>نبذة / الوصف</label><textarea value={form.description} onChange={(e) => set('description', e.target.value)} /></div>
        <div className="grid grid-3">
          <div className="field"><label>الكلية</label><input value={form.college_name} onChange={(e) => set('college_name', e.target.value)} /></div>
          <div className="field"><label>الاختصاص</label><input value={form.specialization} onChange={(e) => set('specialization', e.target.value)} /></div>
          <div className="field"><label>سنة التخرج</label><input value={form.graduation_year} onChange={(e) => set('graduation_year', e.target.value)} /></div>
        </div>
        <div className="grid grid-2">
          <div className="field"><label>نوع المشروع</label><input value={form.project_type} onChange={(e) => set('project_type', e.target.value)} /></div>
          <div className="field"><label>اسم مطوّر المنصة (يظهر في التذييل)</label><input value={form.developed_by} onChange={(e) => set('developed_by', e.target.value)} /></div>
        </div>
      </div>

      <ArraySection title="أهمية المشروع" keyName="importance" arr={arr.importance} addItem={addItem} removeItem={removeItem} editItem={editItem} />
      <ArraySection title="أهداف المشروع" keyName="goals" arr={arr.goals} addItem={addItem} removeItem={removeItem} editItem={editItem} />
      <ArraySection title="الجانب البرمجي (تقنيات)" keyName="software" arr={arr.software} addItem={addItem} removeItem={removeItem} editItem={editItem} />

      <div className="dash-card">
        <h3>المشكلة</h3>
        <div className="field"><textarea value={form.problem} onChange={(e) => set('problem', e.target.value)} /></div>
      </div>
      <div className="dash-card">
        <h3>النصوص الكهربائية/الإلكترونية (الجانب الإلكتروني)</h3>
        <div className="field"><textarea value={form.electronics} onChange={(e) => set('electronics', e.target.value)} /></div>
      </div>
      <div className="dash-card">
        <h3>الخاتمة</h3>
        <div className="field"><textarea value={form.conclusion} onChange={(e) => set('conclusion', e.target.value)} /></div>
      </div>

      <WorkingMechanismEditor form={form} setForm={setForm} />
      <BlockDiagramEditor form={form} setForm={setForm} />
      <TestingEditor form={form} setForm={setForm} />

      <button className="btn" onClick={save} disabled={saving}>
        <Icon name="save" size={18} /> {saving ? 'جارٍ الحفظ...' : 'حفظ كل الإعدادات'}
      </button>
    </>
  )
}

function ArraySection({ title, keyName, arr, addItem, removeItem, editItem }) {
  return (
    <div className="dash-card">
      <h3>{title}</h3>
      {arr.map((item, i) => (
        <div key={i} className="arr-item">
          <span>{item}</span>
          <button className="btn-ic" title="تعديل" onClick={() => editItem(keyName, i)}><Icon name="edit" size={16} /></button>
          <button className="btn-ic danger" title="حذف" onClick={() => removeItem(keyName, i)}><Icon name="trash" size={16} /></button>
        </div>
      ))}
      <button className="btn btn-sm btn-ghost" onClick={() => addItem(keyName)}>+ إضافة عنصر</button>
    </div>
  )
}

function WorkingMechanismEditor({ form, setForm }) {
  const steps = form.working_mechanism || []
  const setSteps = (v) => setForm((f) => ({ ...f, working_mechanism: v }))
  const update = (i, k, v) => setSteps(steps.map((s, j) => (j === i ? { ...s, [k]: v } : s)))
  const add = () => setSteps([...steps, { step: String(steps.length + 1).padStart(2, '0'), title: '', desc: '' }])
  const remove = (i) => setSteps(steps.filter((_, j) => j !== i))
  return (
    <div className="dash-card">
      <h3>آلية عمل النظام (الخطوات)</h3>
      {steps.map((s, i) => (
        <div key={i} style={{ border: '1px solid rgba(185,167,121,0.2)', borderRadius: 12, padding: 14, marginBottom: 14 }}>
          <div className="grid grid-3">
            <div className="field"><label>الرقم</label><input value={s.step} onChange={(e) => update(i, 'step', e.target.value)} /></div>
            <div className="field" style={{ gridColumn: 'span 2' }}><label>العنوان</label><input value={s.title} onChange={(e) => update(i, 'title', e.target.value)} /></div>
          </div>
          <div className="field"><label>الوصف</label><input value={s.desc} onChange={(e) => update(i, 'desc', e.target.value)} /></div>
          <button className="btn btn-sm btn-danger" onClick={() => remove(i)}>حذف الخطوة</button>
        </div>
      ))}
      <button className="btn btn-sm btn-ghost" onClick={add}>+ إضافة خطوة</button>
    </div>
  )
}

function BlockDiagramEditor({ form, setForm }) {
  const nodes = form.block_diagram || []
  const setNodes = (v) => setForm((f) => ({ ...f, block_diagram: v }))
  const update = (i, k, v) => setNodes(nodes.map((s, j) => (j === i ? { ...s, [k]: v } : s)))
  const add = () => setNodes([...nodes, { from: '', to: '' }])
  const remove = (i) => setNodes(nodes.filter((_, j) => j !== i))
  return (
    <div className="dash-card">
      <h3>مخطط النظام</h3>
      <div className="notice">ملاحظة: HC-06 وحدة Bluetooth فقط، والتعرف الصوتي يتم عبر الهاتف / تطبيق خارجي — أضف وحدة تعرف صوتي هنا إذا وُجدت فعليًّا.</div>
      {nodes.map((s, i) => (
        <div key={i} className="grid grid-2" style={{ marginBottom: 10, alignItems: 'end' }}>
          <div className="field"><label>من</label><input value={s.from} onChange={(e) => update(i, 'from', e.target.value)} /></div>
          <div className="field">
            <label>إلى</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={s.to} onChange={(e) => update(i, 'to', e.target.value)} />
              <button className="btn-ic danger" onClick={() => remove(i)}><Icon name="trash" size={16} /></button>
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-sm btn-ghost" onClick={add}>+ إضافة رابط</button>
    </div>
  )
}

function TestingEditor({ form, setForm }) {
  const tests = form.testing || []
  const setTests = (v) => setForm((f) => ({ ...f, testing: v }))
  const updateTest = (i, k, v) => setTests(tests.map((s, j) => (j === i ? { ...s, [k]: v } : s)))
  const updateItem = (ti, ii, v) => setTests(tests.map((t, j) => (j === ti ? { ...t, items: t.items.map((x, z) => (z === ii ? v : x)) } : t)))
  const addTest = () => setTests([...tests, { title: '', items: [] }])
  const addItem = (ti) => {
    const v = prompt('أضف بند اختبار:')
    if (v && v.trim()) setTests(tests.map((t, j) => (j === ti ? { ...t, items: [...t.items, v.trim()] } : t)))
  }
  const removeItem = (ti, ii) => setTests(tests.map((t, j) => (j === ti ? { ...t, items: t.items.filter((_, z) => z !== ii) } : t)))
  const removeTest = (i) => setTests(tests.filter((_, j) => j !== i))
  return (
    <div className="dash-card">
      <h3>الاختبارات والنتائج</h3>
      {tests.map((t, ti) => (
        <div key={ti} style={{ border: '1px solid rgba(185,167,121,0.2)', borderRadius: 12, padding: 14, marginBottom: 14 }}>
          <div className="grid grid-2" style={{ alignItems: 'end' }}>
            <div className="field"><label>عنوان الاختبار</label><input value={t.title} onChange={(e) => updateTest(ti, 'title', e.target.value)} /></div>
            <button className="btn btn-sm btn-danger" onClick={() => removeTest(ti)}>حذف الاختبار</button>
          </div>
          {t.items.map((item, ii) => (
            <div key={ii} className="arr-item">
              <input value={item} onChange={(e) => updateItem(ti, ii, e.target.value)} />
              <button className="btn-ic danger" onClick={() => removeItem(ti, ii)}><Icon name="trash" size={16} /></button>
            </div>
          ))}
          <button className="btn btn-sm btn-ghost" onClick={() => addItem(ti)}>+ بند</button>
        </div>
      ))}
      <button className="btn btn-sm btn-ghost" onClick={addTest}>+ إضافة اختبار</button>
    </div>
  )
}

function CollectionEditor({ table, fields, title, numeric = [], storage = false, onSaved }) {
  const toast = useToast()
  const { upload, busy } = useFiles()
  const [items, setItems] = useState([])

  useEffect(() => {
    supabase.from(table).select('*').order('sort_order').then(({ data }) => {
      if (data) setItems(data)
    })
  }, [table])

  const load = async () => {
    const { data } = await supabase.from(table).select('*').order('sort_order')
    if (data) setItems(data)
  }

  const blank = () => {
    const obj = {}
    fields.forEach((f) => {
      obj[f] = numeric.includes(f) ? (items.length + 1) : ''
    })
    return obj
  }

  const create = async () => {
    const row = { ...blank(), sort_order: items.length + 1 }
    const { data, error } = await supabase.from(table).insert(row).select()
    if (error) return toast('تعذر الإضافة')
    setItems([...items, data[0]])
    toast('تمت الإضافة')
    onSaved?.()
  }

  const update = async (id, patch) => {
    const { error } = await supabase.from(table).update(patch).eq('id', id)
    if (error) return toast('تعذر التعديل')
    await load()
    onSaved?.()
    toast('تم التعديل')
  }

  const remove = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) return toast('تعذر الحذف')
    await load()
    onSaved?.()
    toast('تم الحذف')
  }

  const uploadToField = async (rowId, field) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = async () => {
      try {
        const url = await upload(input.files[0])
        await update(rowId, { [field]: url })
      } catch { toast('فشل الرفع') }
    }
    input.click()
  }

  return (
    <>
      <h3 className="dash-section-title">{title}</h3>
      <button className="btn btn-sm btn-ghost" onClick={create} disabled={busy}>+ إضافة {title === 'ملفات المشروع' ? 'ملف' : 'عنصر'}</button>
      <div style={{ marginTop: 16 }}>
        {items.map((row) => (
          <RowCard
            key={row.id}
            row={row}
            fields={fields}
            numeric={numeric}
            storage={storage}
            busy={busy}
            onUpdate={update}
            onRemove={remove}
            onUpload={uploadToField}
          />
        ))}
        {items.length === 0 && <p style={{ color: 'var(--muted)' }}>لا توجد عناصر بعد.</p>}
      </div>
    </>
  )
}

function RowCard({ row, fields, numeric, storage, busy, onUpdate, onRemove, onUpload }) {
  const [draft, setDraft] = useState(row)
  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }))
  const commit = (k) => {
    const nv = draft[k]
    const ov = row[k]
    if (String(nv ?? '') !== String(ov ?? '')) onUpdate(row.id, { [k]: nv })
  }

  return (
    <div className="dash-card">
      <div className="grid grid-2">
        {fields.map((f, fi) => {
          const val = draft[f] ?? ''
          return (
            <div className="field" key={f} style={fi === 0 ? { gridColumn: '1/-1' } : undefined}>
              <label>{f}</label>
              {storage && f === 'file_url' ? (
                <div>
                  <input value={val} onChange={(e) => set(f, e.target.value)} onBlur={() => commit(f)} placeholder="ضع رابطًا أو ارفع ملفًا" />
                  <button className="btn btn-sm btn-ghost" onClick={() => onUpload(row.id, 'file_url')} disabled={busy}>رفع ملف</button>
                  {val && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{val}</div>
                  )}
                </div>
              ) : (
                <input
                  value={val}
                  type={numeric.includes(f) ? 'number' : 'text'}
                  onChange={(e) => set(f, numeric.includes(f) ? Number(e.target.value) : e.target.value)}
                  onBlur={() => commit(f)}
                />
              )}
            </div>
          )
        })}
      </div>
      {storage && draft.image_url && <img src={draft.image_url} alt="" className="preview-img" />}
      <div className="dash-actions">
        {storage && draft.file_url && (
          <a className="btn btn-sm btn-ghost" href={draft.file_url} target="_blank" rel="noreferrer">عرض</a>
        )}
        <button className="btn btn-sm btn-danger" onClick={() => onRemove(row.id)}>حذف</button>
      </div>
    </div>
  )
}

function MediaEditor({ onSaved }) {
  const toast = useToast()
  const { upload, busy } = useFiles()
  const [items, setItems] = useState([])

  useEffect(() => {
    supabase.from('media').select('*').order('sort_order').then(({ data }) => {
      if (data) setItems(data)
    })
  }, [])

  const load = async () => {
    const { data } = await supabase.from('media').select('*').order('sort_order')
    if (data) setItems(data)
  }

  const add = async (type) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = type === 'video' ? 'video/*' : 'image/*'
    input.onchange = async () => {
      const file = input.files[0]
      if (!file) return
      try {
        const url = await upload(file)
        const { error } = await supabase.from('media').insert({ title: file.name, type, url, sort_order: items.length + 1 })
        if (error) return toast('تعذر الحفظ')
        await load()
        onSaved?.()
        toast('تمت إضافة الوسيط')
      } catch { toast('فشل الرفع') }
    }
    input.click()
  }

  const updateTitle = async (id, title) => {
    await supabase.from('media').update({ title }).eq('id', id)
    await load()
    onSaved?.()
    toast('تم تعديل العنوان')
  }
  const remove = async (id) => {
    await supabase.from('media').delete().eq('id', id)
    await load()
    onSaved?.()
    toast('تم الحذف')
  }

  return (
    <>
      <h3 className="dash-section-title">معرض المشروع</h3>
      <div className="dash-actions" style={{ margin: '0 0 18px' }}>
        <button className="btn btn-sm" onClick={() => add('image')} disabled={busy}>+ رفع صورة</button>
        <button className="btn btn-sm btn-ghost" onClick={() => add('video')} disabled={busy}>+ رفع فيديو</button>
      </div>
      {items.map((m) => (
        <MediaRow key={m.id} item={m} onTitle={updateTitle} onRemove={remove} />
      ))}
    </>
  )
}

function MediaRow({ item, onTitle, onRemove }) {
  const [draft, setDraft] = useState(item.title)
  const commit = () => {
    const t = draft.trim()
    if (t && t !== item.title) onTitle(item.id, t)
    else setDraft(item.title)
  }
  return (
    <div className="dash-card">
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        {item.type === 'video' ? (
          <video src={item.url} style={{ width: 150, borderRadius: 10 }} controls />
        ) : (
          <img src={item.thumbnail_url || item.url} alt={item.title} style={{ width: 150, height: 110, objectFit: 'cover', borderRadius: 10 }} />
        )}
        <div style={{ flex: 1 }}>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit} placeholder="عنوان الوسيط" />
          <div className="dash-actions">
            <a className="btn btn-sm btn-ghost" href={item.url} target="_blank" rel="noreferrer">فتح</a>
            <button className="btn btn-sm btn-danger" onClick={() => onRemove(item.id)}>حذف</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function VisitorsView({ visitors }) {
  return (
    <>
      <h3 className="dash-section-title">قائمة الزوار</h3>
      <div className="dash-card" style={{ overflowX: 'auto' }}>
        <table className="visitor-table">
          <thead>
            <tr><th>الاسم</th><th>عدد الزيارات</th><th>آخر زيارة</th><th>أول زيارة</th></tr>
          </thead>
          <tbody>
            {visitors.map((v) => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.visit_count}</td>
                <td>{new Date(v.last_visit).toLocaleString('ar-SY')}</td>
                <td>{new Date(v.created_at).toLocaleString('ar-SY')}</td>
              </tr>
            ))}
            {visitors.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--muted)' }}>لا توجد زيارات مسجلة بعد.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}