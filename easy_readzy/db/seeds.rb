# 初期ユーザーを作成
guest = User.find_or_initialize_by(email: "guest@example.com")
guest.name = "guest_user"
guest.password = SecureRandom.hex(10)
guest.save!
# 初期ユーザーの本棚を作成
guest.bookshelves.find_or_create_by!(bookshelf_name: "マイ本棚")
