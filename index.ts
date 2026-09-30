import type { PluginContext, PluginSetup } from './plugin-api.js';

const setup: PluginSetup = async (ctx: PluginContext) => {
  ctx.route({ method: 'GET', path: '/ping', auth: 'public' }, async (_req, res) => {
    const greeting = (await ctx.settings.get<string>('GREETING')) ?? 'hi';
    res.json({ ok: true, greeting, plugin: ctx.pluginId, from: 'GitHub 导入的一次性冒烟插件' });
  });

  ctx.events.on('user.registered', (payload) => {
    ctx.logger.info('看到注册事件', { userId: payload.userId });
  });

  return () => ctx.logger.info('smoke_ping 已卸载');
};

export default setup;
