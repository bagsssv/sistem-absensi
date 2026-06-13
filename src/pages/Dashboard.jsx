import { useState, useEffect } from 'react'
import './Dashboard.css'

function Dashboard() {
  // Load dari localStorage atau pakai dummy data
  const [interns, setInterns] = useState(() => {
    const saved = localStorage.getItem('internData')
    if (saved) {
      return JSON.parse(saved)
    }
    return [
      {
        id: 1,
        name: 'Bagus Pratama',
        division: 'Front End',
        avatar: 'https://ui-avatars.com/api/?name=Bagus+Pratama&background=667eea&color=fff',
        clock_in: '2026-05-20 14:27:03',
        clock_out: '2026-05-20 19:27:03',
        status: 'Selesai'
      },
      {
        id: 2,
        name: 'Andi Saputra',
        division: 'Back End',
        avatar: 'https://ui-avatars.com/api/?name=Andi+Saputra&background=10b981&color=fff',
        clock_in: '2026-06-11 08:00:00',
        clock_out: null,
        status: 'Aktif'
      },
      {
        id: 3,
        name: 'Siti Aminah',
        division: 'UI/UX Designer',
        avatar: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=f59e0b&color=fff',
        clock_in: '2026-06-11 08:15:00',
        clock_out: '2026-06-11 17:30:00',
        status: 'Selesai'
      }
    ]
  })


    // Simpan ke localStorage setiap kali interns berubah
  useEffect(() => {
    localStorage.setItem('internData', JSON.stringify(interns))
  }, [interns])

  const [externalData, setExternalData] = useState([])
  const [loading, setLoading] = useState(false)

  // Fungsi untuk fetch data external
  const fetchExternalData = async () => {
    setLoading(true)
    // Simulasi API call
    setTimeout(() => {
      setExternalData([
        { name: 'Data 1', division: 'IT' },
        { name: 'Data 2', division: 'Marketing' }
      ])
      setLoading(false)
    }, 1000)
  }

  // Fungsi handle action buttons
  const handleEdit = (id) => {
    alert(`Edit intern ID: ${id}`)
  }

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus?')) {
      setInterns(interns.filter(intern => intern.id !== id))
    }
  }

  const handleClockOut = (id) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
    setInterns(interns.map(intern => 
      intern.id === id ? { ...intern, clock_out: now, status: 'Selesai' } : intern
    ))
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      {/* <header className="dashboard-header">
        <h1>Sistem Absensi Magang</h1>
      </header> */}

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Panel Kiri - Data Intern Lokal */}
        <div className="panel panel-left">
          <div className="panel-header">
            <h2>Data Intern Lokal</h2>
            {/* <button className="btn-tambah">Tambah</button> */}
          </div>

          <table className="intern-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Divisi</th>
                <th>Jam Masuk (WIB)</th>
                <th>Jam Pulang (WIB)</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => (
                <tr key={intern.id}>
                  <td>
                    <div className="intern-name-wrapper">
                      <img src={intern.avatar} alt={intern.name} className="intern-avatar" />
                      <div>
                        <span className="intern-name">{intern.name}</span>
                        <span className={`badge ${intern.status === 'Aktif' ? 'badge-aktif' : 'badge-selesai'}`}>
                          {intern.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{intern.division}</td>
                  <td>{intern.clock_in}</td>
                  <td className={intern.clock_out ? 'clocked-out' : ''}>
                    {intern.clock_out || '-'}
                  </td>
                  <td>
                    <button 
                      className="btn-action btn-edit"
                      onClick={() => handleEdit(intern.id)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-action btn-delete"
                      onClick={() => handleDelete(intern.id)}
                    >
                      Hapus
                    </button>
                    {!intern.clock_out && (
                      <button 
                        className="btn-action btn-pulang"
                        onClick={() => handleClockOut(intern.id)}
                      >
                        Pulang
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel Kanan - Sync Data Server */}
        <div className="panel panel-right">
          <h2>Sync Data Server (Guzzle)</h2>
          <p className="panel-description">
            Cari dan fetch data eksternal menggunakan Guzzle di Backend Laravel.
          </p>

          <button 
            className="btn-sync"
            onClick={fetchExternalData}
            disabled={loading}
          >
            {loading ? 'Mengambil data...' : 'Ambil Data Eksternal'}
          </button>

          <div className="external-data">
            {externalData.length > 0 ? (
              externalData.map((data, index) => (
                <div key={index} className="data-item">
                  <strong>{data.name}</strong>
                  <div>{data.division}</div>
                </div>
              ))
            ) : (
              <p className="no-data">Belum ada data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard