module BooksHelper
  # description のHTMLタグの整形
  def sanitize_description(description)
    return "-" if description.blank? || description == "-"

    # <br>タグを改行に変換
    text = description.to_s.gsub(/<br\s*\/?>|<\/br>/i, "\n")

    text = ActionController::Base.helpers.strip_tags(text)

    # 返す
    text
  end
end
