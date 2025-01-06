import { redirect } from "next/navigation"
import { getProfileByAuthId } from "../db"

type ProfilePageProps = {
  params: Promise<{ authId: string }>
}

async function ProfilePage({ params }: ProfilePageProps) {
  const authId = (await params).authId
  const profile = await getProfileByAuthId(authId)
  if (!profile) redirect("/")
  return (
    <main>
      <h2 className="text-4xl mt-6">
       Hello {profile.firstName} {profile.lastName}
      </h2>
    </main>
  )
}

export default ProfilePage
