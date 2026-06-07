import ProfileForm from '../../forms/ProfileForm'

export default function Profile() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <div className="max-w-2xl">
        <ProfileForm defaultValues={{ fullName: 'Jane Doe', email: 'jane@example.com', skills: 'UI, UX', interests: 'Education' }} />
      </div>
    </div>
  )
}
