export const userAdapter = (user) => {
    if (!user) return null;
  
    return {
      id: user._id || user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      tel: user.tel || "",
      hakkimda: user.hakkimda || "",
      file: user.file || "",
      uzmanlik: user.uzmanlik || [],
      sertifika: user.sertifika || [],
      selectedFile: user.selectedFile || "",
      unvan: user.unvan || "",
    };
  };