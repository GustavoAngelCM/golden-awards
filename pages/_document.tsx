import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel='manifest' href='/manifest.json' />
					<link rel='icon' href='/awards.ico' />
					<link rel='apple-touch-icon' href='/backgroundA.jpg' />
					<meta name='application-name' content='Golden Awards' />
					<meta name='description' content='Golden Nights Awards' />
					<meta name='theme-color' content='#ff4d00' />
				</Head>
				<body>
					<Main />
					<NextScript />

				</body>
			</Html>
		);
	}
}

export default MyDocument;
