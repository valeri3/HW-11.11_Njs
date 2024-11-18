module.exports = {
    user: 'lera',   				// пользователь базы данных
    password: '1234',	 			// пароль пользователя
    server: 'PC070623\\SQLEXPRESS',	// хост
    database: 'ChatApp',  	        // имя бд
    port: 1433,			 			// порт, на котором запущен sql server
    options: {
        encrypt: true,  // Использование SSL/TLS
        trustServerCertificate: true // Отключение проверки самоподписанного сертификата
    }
};
