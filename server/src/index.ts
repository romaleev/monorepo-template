import app from '#server/app'
import { serverPort } from '#server/common/env'

app.listen(serverPort, () => {
	console.log(`Server running on port ${serverPort}`)
})
