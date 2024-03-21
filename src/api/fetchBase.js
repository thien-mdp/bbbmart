import Cookies from "js-cookie";

const fetchBase = async (url) => {
  const access_token = Cookies.get('token'); // Lấy token mỗi lần function được gọi để đảm bảo token luôn mới
  const appEnv = import.meta.env.VITE_APP_ENV; // Lấy biến môi trường để xác định môi trường hiện tại
  let fullUrl = url;

  // Nếu ở môi trường sản xuất, chỉnh sửa URL
  if (appEnv === 'production') {
    fullUrl = `https://public.kiotapi.com${url.replace(/^\/api/, '')}`;
  }

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Retailer': 'bobebedn',
        'Authorization': `Bearer ${access_token}`,
        'Access-Control-Allow-Origin': 'https://public.kiotapi.com'
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Chuyển đổi kết quả từ JSON
    return data; // Trả về dữ liệu
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Ném lỗi để có thể xử lý bên ngoài function
  }
};

export default fetchBase;
