import { useState } from 'react'
import './Profile.css'

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Bagus',
    email: 'bagus@example.com',
    division: 'Front End',
    phone: '081234567890',
    address: 'Jl. Contoh No. 123, Jakarta'
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    alert('Profile berhasil diupdate!')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Header Profile */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span>👤</span>
          </div>
          <h2>{profile.name}</h2>
          <p className="profile-division">{profile.division}</p>
        </div>

        {/* Profile Info */}
        <div className="profile-body">
          <div className="profile-section">
            <h3>Informasi Pribadi</h3>
            
            <div className="info-row">
              <label>Nama Lengkap</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              ) : (
                <div className="info-value">{profile.name}</div>
              )}
            </div>

            <div className="info-row">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              ) : (
                <div className="info-value">{profile.email}</div>
              )}
            </div>

            <div className="info-row">
              <label>No. Telepon</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              ) : (
                <div className="info-value">{profile.phone}</div>
              )}
            </div>

            <div className="info-row">
              <label>Alamat</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  rows="3"
                />
              ) : (
                <div className="info-value">{profile.address}</div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button 
                  className="btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Batal
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleSave}
                >
                  Simpan Perubahan
                </button>
              </>
            ) : (
              <button 
                className="btn-primary"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile