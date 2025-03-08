src/
├── auth/
│   ├── dtos/
│   │   └── login.dto.ts
│   ├── entities/
│   │   └── users.entity.ts
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   └── auth.service.ts
├── common/
│   ├── config/
│   │   ├── database.config.ts
│   │   └── jwt.strategy.ts
│   ├── constants/
│   │   └── constants.ts
│   ├── exceptions/
│   │   └── errorExceptions.ts
│   ├── helper/
│   │   └── common.helper.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   ├── jwt.guard.ts
│   │   └── logger.middleware.ts
│   └── responses/
│       └── responses.utils.ts
├── app.module.ts
├── main.ts
├── .env
├── .gitignore
└── swagger.yml