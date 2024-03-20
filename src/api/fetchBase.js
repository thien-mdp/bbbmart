import Cookies from "js-cookie";

const fetchBase = async (url) => {
  const access_token = Cookies.get('token'); // Lấy token mỗi lần function được gọi để đảm bảo token luôn mới

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { // Đảm bảo sử dụng 'headers' không phải 'header'
        'Content-Type': 'application/json',
        'Retailer': 'bobebedn',
        'Authorization': `Bearer ${access_token}`,
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