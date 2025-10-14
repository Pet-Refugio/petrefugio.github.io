export const testAPIConnection = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/health');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Conexão com API estabelecida:', data);
      return true;
    } else {
      console.error('❌ API respondeu com erro:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Não foi possível conectar com a API:', error.message);
    return false;
  }
};