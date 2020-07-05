export default {
  get: jest.fn().mockResolvedValue({
    data: { 
      logged_in: "LOGGED_IN", 
      user:{
        name: "Jhon", 
        role: "Admin"}
  }
  }),

  post: jest.fn().mockResolvedValue({
    data: { 
      logged_in: "true", 
      user:{
        name: "Jhon", 
        role: "Admin"}
  }
  })
}