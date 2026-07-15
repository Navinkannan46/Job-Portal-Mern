const { PrismaClient } = require('@prisma/client'); try { new PrismaClient({ log: ['info'] }); console.log('success'); } catch (e) { console.error('ERROR:', e.message); }  
