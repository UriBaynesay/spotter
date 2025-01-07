import { redirect } from "next/navigation"
import { getProfileByAuthId } from "../db"
import UpdateProfileLink from "@/components/profile/update/update-profile-link"


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
        {profile.firstName} {profile.lastName}
      </h2>
      <UpdateProfileLink authId={authId} />
    </main>
  )
}

export default ProfilePage
