export function middleware(request) {
  // ホワイトリストに登録されたIPリストを取得
  const ipWhiteList = new Set(
    (process.env.IP_WHITE_LIST || '').split(',').map((item) => item.trim()),
  )

  // アクセス制限対象のFQDNを取得
  const accessRestrictionFqdnList = new Set(
    (process.env.ACCESS_RESTRICTION_FQDN_LIST || '')
      .split(',')
      .map((item) => item.trim()),
  )

  if (process.env.NODE_ENV === 'production') {
    if (
      !ipWhiteList.has(request.ip) &&
      accessRestrictionFqdnList.has(request.nextUrl.host)
    ) {
      console.info(
        `ホワイトリストに追加されていないIPアドレスからアクセスされたため、アクセスを拒否しました。[request.ip = ${request.ip}, request.nextUrl.host = ${request.nextUrl.host}]`,
      )
      return new Response(null, { status: 401 })
    } else {
      console.info(
        `ホワイトリストに追加されているIPアドレスからアクセスされました。[request.ip = ${request.ip}, request.nextUrl.host = ${request.nextUrl.host}]`,
      )
    }
  }
}
