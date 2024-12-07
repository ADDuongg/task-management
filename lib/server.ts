export const getAllUsers = async () => {
  const response = await fetch(`http://localhost:3000/api/user/getall`, {
    next: { revalidate: 60 },
  })
  const responseData = await response.json()
  return responseData.users
}