import { useState, useEffect } from 'react'
import './Jurnal.css'

function Jurnal() {
  const now = new Date()
  const options = { 
    timeZone: 'Asia/Jakarta',
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  const todayWIB = now.toLocaleDateString('id-ID', options)
  
  const formatTimeWIB = (date) => {
    return date.toLocaleTimeString('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const [formData, setFormData] = useState({
    judul: '',
    kegiatan: '',
    gambar: null
  })
  
  // Load dari localStorage atau pakai dummy data
  const [jurnalHariIni, setJurnalHariIni] = useState(() => {
    const saved = localStorage.getItem('jurnalData')
    if (saved) {
      return JSON.parse(saved)
    }
    return [
      {
        id: 1,
        author: 'Bagus Pratama',
        avatar: 'https://ui-avatars.com/api/?name=Bagus+Pratama&background=667eea&color=fff',
        judul: 'Implementasi React Router',
        kegiatan: 'Belajar routing di React, membuat navbar, dan setup protected routes',
        createdAt: formatTimeWIB(new Date())
      }
    ,{
      id: 2,
      author: 'Andi Saputra',
      avatar: 'https://ui-avatars.com/api/?name=Andi+Saputra&background=10b981&color=fff',
      judul: 'Setup Database Laravel',
      kegiatan: 'Migrasi database dan membuat seeder untuk data dummy karyawan.',
      createdAt: formatTimeWIB(new Date())
    }
    ]
  })
  
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

    // Simpan ke localStorage setiap kali jurnalHariIni berubah
  useEffect(() => {
    localStorage.setItem('jurnalData', JSON.stringify(jurnalHariIni))
  }, [jurnalHariIni])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!validTypes.includes(file.type)) {
        alert('Format file harus JPG, JPEG, atau PNG')
        e.target.value = ''
        return
      }
      
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2MB')
        e.target.value = ''
        return
      }

      setFormData(prev => ({
        ...prev,
        gambar: file
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    setTimeout(() => {
      const newJurnal = {
        id: Date.now(),
        judul: formData.judul,
        kegiatan: formData.kegiatan,
        gambar: formData.gambar,
        gambarPreview: formData.gambar ? URL.createObjectURL(formData.gambar) : null,
        createdAt: formatTimeWIB(new Date())
      }
      
      setJurnalHariIni(prev => [newJurnal, ...prev])
      setSubmitting(false)
      setShowForm(false)
      
      setFormData({
        judul: '',
        kegiatan: '',
        gambar: null
      })
      
      alert('Jurnal berhasil disimpan!')
    }, 1000)
  }

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus jurnal ini?')) {
      setJurnalHariIni(prev => prev.filter(j => j.id !== id))
    }
  }

  const handleEdit = (jurnal) => {
    setFormData({
      judul: jurnal.judul,
      kegiatan: jurnal.kegiatan,
      gambar: jurnal.gambar,
    })
    setShowForm(true)
  }

  return (
    <div className="jurnal-container">
      <div className="jurnal-header">
        <h2>📝 Jurnal Magang</h2>
        <p className="jurnal-date">
          Tanggal: {todayWIB}
        </p>
      </div>

      {!showForm && (
        <button 
          className="btn-tulis-jurnal"
          onClick={() => setShowForm(true)}
        >
          ✍️ Tulis Jurnal Hari Ini
        </button>
      )}

      {showForm && (
        <div className="jurnal-form-card">
          <div className="form-header">
            <h3>{formData.id ? 'Edit Jurnal' : 'Tulis Jurnal Baru'}</h3>
            <button 
              className="btn-close"
              onClick={() => {
                setShowForm(false)
                setFormData({ judul: '', kegiatan: '', gambar: null })
              }}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="jurnal-form">
            <div className="form-group">
              <label>Judul Kegiatan</label>
              <input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                placeholder="Contoh: Implementasi React Router"
                required
              />
            </div>

            <div className="form-group">
              <label>Kegiatan yang Dilakukan</label>
              <textarea
                name="kegiatan"
                value={formData.kegiatan}
                onChange={handleChange}
                placeholder="Jelaskan kegiatan yang Anda lakukan hari ini..."
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Foto Kegiatan (Opsional)</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="gambar"
                  name="gambar"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/jpg,image/png"
                />
                <div className="file-hint">
                  Format: JPG, JPEG, PNG (Max 2MB)
                </div>
              </div>
              {formData.gambar && (
                <div className="file-preview">
                  <span className="file-icon"></span>
                  <span className="file-name">{formData.gambar.name}</span>
                  <span className="file-size">
                    ({(formData.gambar.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-batal"
                onClick={() => setShowForm(false)}
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="btn-simpan"
                disabled={submitting}
              >
                {submitting ? 'Menyimpan...' : 'Simpan Jurnal'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="jurnal-list-section">
        <h3>📋 Jurnal Hari Ini ({jurnalHariIni.length})</h3>
        
        {jurnalHariIni.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📝</span>
            <p>Belum ada jurnal untuk hari ini</p>
            <button 
              className="btn-mulai"
              onClick={() => setShowForm(true)}
            >
              Mulai Tulis Jurnal
            </button>
          </div>
        ) : (
          <div className="jurnal-list">
            {jurnalHariIni.map((jurnal) => (
              <div key={jurnal.id} className="jurnal-card">
                <div className="jurnal-card-header">
                  <div className="jurnal-title-section">
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <img src={jurnal.avatar} alt={jurnal.author} className="intern-avatar" />
                      <div>
                        <h4 style={{ margin: 0 }}>{jurnal.judul}</h4>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>Oleh: {jurnal.author}</span>
                      </div>
                    </div>
                    <span className="jurnal-time">
                      🕐 {jurnal.createdAt} WIB
                    </span>
                  </div>
                  {/* ... tombol edit/delete ... */}
                  <div className="jurnal-actions">
                    <button 
                      className="btn-edit-small"
                      onClick={() => handleEdit(jurnal)}
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-delete-small"
                      onClick={() => handleDelete(jurnal.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="jurnal-card-body">
                  <div className="jurnal-item">
                    <strong>Kegiatan:</strong>
                    <p>{jurnal.kegiatan}</p>
                  </div>
                  
                  {jurnal.gambarPreview && (
                    <div className="jurnal-image">
                      <img src={jurnal.gambarPreview} alt="Kegiatan" />
                    </div>
                  )}
                </div>

                <div className="jurnal-card-footer">
                  <span className="jurnal-timestamp">
                    Dibuat: {jurnal.createdAt} WIB
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Jurnal