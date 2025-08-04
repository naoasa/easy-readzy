# 初期ユーザーを作成
guest = User.find_or_initialize_by(email: "guest@example.com")
guest.name = "guest_user"
guest.password = SecureRandom.hex(10)
guest.save!
