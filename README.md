Hướng Dẫn Sử Dụng Trang Web Ocean Life Sorting Game
Trang web Ocean Life Sorting Game là một trò chơi sắp xếp ảnh theo chủ đề đại dương. Người chơi cần kéo và thả các ảnh vào các ô (slot) sao cho đúng thứ tự được yêu cầu: 1, 4, 3, 5, 2. Bạn cũng có thể tùy chỉnh ảnh thông qua trang quản lý. Dưới đây là hướng dẫn chi tiết:
1. Chơi Trò Chơi

Truy cập trang trò chơi tại:https://order-pic-tain03s-projects.vercel.app/index.html
Bạn sẽ thấy 5 ảnh đại dương (hoặc số lượng ảnh tùy chỉnh) trong khu vực nguồn (Source Panel) và 5 ô trống (Slots Container).
Cách chơi:
Kéo và thả các ảnh từ khu vực nguồn vào các ô trống.
Sắp xếp ảnh sao cho đúng thứ tự: Ảnh 1, Ảnh 4, Ảnh 3, Ảnh 5, Ảnh 2.
Nhấn nút Kiểm Tra để kiểm tra kết quả:
Nếu đúng, bạn sẽ nhận được thông báo "Congratulations! You arranged the images correctly!" cùng hiệu ứng bong bóng.
Nếu sai, các ảnh sẽ tự động trở về khu vực nguồn, và bạn có thể thử lại.




Số lần thử được hiển thị tại Attempts Counter.

2. Quản Lý Ảnh

Nhấn nút Quản Lý trên trang trò chơi để chuyển đến trang quản lý tại:https://order-pic-tain03s-projects.vercel.app/manage.html
Tại đây, bạn có thể tùy chỉnh ảnh và cấu hình trò chơi:
Thay đổi số lượng ảnh:
Sử dụng ô nhập số tại Number of Images (1-10) để chọn số lượng ảnh (tối đa 10).


Upload ảnh từ máy:
Đối với mỗi ảnh, nhấn vào ô Choose File để tải ảnh từ máy tính (chỉ hỗ trợ định dạng JPEG và PNG).
Ảnh sẽ hiển thị ngay trong phần preview.


Sắp xếp thứ tự ảnh:
Sử dụng nút Up và Down để thay đổi thứ tự hiển thị của các ảnh trong khu vực nguồn.


Tải cấu hình đã lưu:
Nhấn nút Load Configuration để tải file game-config.json đã lưu trước đó.
Cấu hình sẽ tự động cập nhật số lượng ảnh và danh sách ảnh.


Lưu cấu hình:
Sau khi chỉnh sửa, nhấn nút Save Configuration để tải file game-config.json về máy.
File này chứa thông tin về số lượng ảnh, danh sách ảnh, và thứ tự hiển thị.


Reset cấu hình:
Nhấn nút Reset để quay lại cấu hình mặc định (5 ảnh với thứ tự ban đầu).


Quay lại trò chơi:
Nhấn nút Back to Game để trở về trang trò chơi.
Cấu hình mới sẽ tự động được áp dụng nhờ lưu trữ tạm thời trong localStorage.





3. Lưu Ý

Thứ tự đúng của trò chơi luôn được hardcode là 1, 4, 3, 5, 2, bất kể bạn thay đổi thứ tự hiển thị của ảnh trong trang quản lý.
Cấu hình được lưu trong localStorage, nên sẽ tự động áp dụng khi bạn quay lại trang trò chơi. Để xóa cấu hình, bạn có thể sử dụng nút Reset trên trang quản lý.
Nếu bạn gặp vấn đề với dung lượng ảnh (vì ảnh được lưu dưới dạng data URL), hãy thử giảm kích thước ảnh trước khi upload.


Hỗ trợ: Nếu bạn gặp bất kỳ vấn đề nào, hãy liên hệ qua [email hỗ trợ] hoặc mở issue trên repository của dự án.
