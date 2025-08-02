# config/puma.rb

app_dir = File.expand_path("../..", __FILE__)
shared_dir = "#{app_dir}/tmp"

# ソケットバインド
bind "unix://#{shared_dir}/sockets/puma.sock"

# PID, state, logのパス指定
pidfile "#{shared_dir}/pids/puma.pid"
state_path "#{shared_dir}/pids/puma.state"
stdout_redirect "#{app_dir}/log/puma.stdout.log", "#{app_dir}/log/puma.stderr.log", true

# スレッド・ワーカー設定
threads_count = ENV.fetch("RAILS_MAX_THREADS", 3).to_i
threads threads_count, threads_count
workers ENV.fetch("WEB_CONCURRENCY", 2)

preload_app!

# 明示的に production を指定
environment ENV.fetch("RAILS_ENV", "production")
