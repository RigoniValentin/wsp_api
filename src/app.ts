import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot';
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys';

const florGenerico = addKeyword('.*').addAnswer('Este chat es solo para *notificaciones* de Río Gestión.\n\n*Gracias!!*');

const main = async () => {
    const provider = createProvider(BaileysProvider);

    provider.initHttpServer(3010);

    provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const body = req.body;
        const numero = body.numero;
        const mensaje = body.mensaje;
        await bot.sendMessage(numero, mensaje, {});
        res.end('Respuesta Ok.');
    }));

    await createBot({
        flow: createFlow([florGenerico]),
        database: new MemoryDB(),
        provider
    });
};

main();