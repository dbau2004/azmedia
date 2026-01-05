# Hướng dẫn Push lên GitHub và Deploy

## 1️⃣ Chuẩn bị GitHub

1. Truy cập [github.com](https://github.com) và đăng nhập
2. Nhấn `+` → **New repository**
3. Đặt tên repo: `azmedia` (hoặc tên bạn muốn)
4. Chọn **Public** nếu muốn deploy
5. Nhấn **Create repository**

---

## 2️⃣ Khởi tạo Git & Push Code

Chạy các lệnh này trong terminal (PowerShell):

```powershell
# Khởi tạo git repo
git init

# Thêm tất cả files
git add .

# Tạo commit đầu tiên
git commit -m "Initial commit: AZ Media website with cleaned HTML"

# Thêm remote GitHub (thay YOUR_USERNAME và your-repo)
git remote add origin https://github.com/YOUR_USERNAME/azmedia.git

# Push lên GitHub (branch main)
git branch -M main
git push -u origin main
```

**Thay thế:**
- `YOUR_USERNAME` → username GitHub của bạn
- `azmedia` → tên repo bạn vừa tạo

---

## 3️⃣ Deploy bằng GitHub Pages

### Cách A: Deploy Static Website (đơn giản nhất)

1. Vào **Settings** của repo → **Pages**
2. Chọn **Deploy from a branch**
3. Branch: `main`, Folder: `/ (root)`
4. Nhấn **Save**

Website sẽ có sẵn tại: `https://YOUR_USERNAME.github.io/azmedia`

---

### Cách B: Deploy bằng GitHub Actions (CI/CD)

Tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

Rồi push lên GitHub - tự động deploy!

---

## 4️⃣ Cập nhật Code sau này

```powershell
# Thay đổi file và save
# Rồi commit & push:

git add .
git commit -m "Cập nhật: [mô tả thay đổi]"
git push origin main
```

Website tự động cập nhật trong 1-2 phút!

---

## ⚠️ Lưu ý

- ✅ HTML tĩnh → OK với GitHub Pages
- ✅ CSS, JS, Images → OK
- ⚠️ Nếu dùng PHP hoặc backend → cần deploy khác (Vercel, Netlify, Heroku)
- 🔒 **Không push** thông tin nhạy cảm (API keys, passwords)

---

## ❓ Gặp lỗi?

**Error: "origin already exists"**
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/azmedia.git
```

**Quên push, muốn xem branch nào**
```powershell
git branch -a
git log --oneline
```

---

## ✅ Hoàn tất!

Sau khi push:
1. Chờ 1-2 phút
2. Truy cập `https://YOUR_USERNAME.github.io/azmedia`
3. Website của bạn live! 🚀
