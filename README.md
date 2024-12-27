# Task APP

## Proje Tanımı

Bu proje, kullanıcıların anlık crypto piyasalarını kontrol edebilecekleri basit bir API sağlar. Kullanıcılar, sisteme kaydolabilir, giriş yapabilir ve abonelik ekleme işlemlerini gerçekleştirebilirler.

## Teknoloji Yığını

- **Node.js**: Sunucu tarafı uygulaması için seçildi.
- **Next.js**: Client tarafı uygulaması için seçildi.
- **Express.js**: RESTful API geliştirmek için kullanıldı.
- **PostgreSQL**: Veritabanı olarak seçildi.

## Mimari Kararlar

1. **RESTful API**: API, REST mimarisi kullanılarak oluşturuldu, bu sayede istemci ve sunucu arasındaki etkileşimler basit ve anlaşılır hale getirildi.
2. **JWT (JSON Web Token)**: Kullanıcı kimlik doğrulaması için kullanıldı. Bu sayede, kullanıcıların giriş yaptıktan sonra yetkilendirilmiş erişim sağlaması mümkün oldu.

### Projeyi Çalıştırmak için Adımlar

1. **Depoyu Klonlayın**:

   ```bash
   git clone https://github.com/Cengizcpr/crypto-app.git
   cd task-app
   ```

2. **Projeyi Başlatın**:

   ```bash
   docker-compose up -d --build
   ```

3. **Server İçin Testleri Çalıştırın**:
   ```bash
   npm test
   ```
