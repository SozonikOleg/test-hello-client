import { StateDrivenMenuExample } from '@/features/menu-router'

/** Live sandbox: menu active state from React state, not the router. */
export function IntegrationDemoPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1a1d26]">
          Menu integration
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#6b7280]">
          Production navigation uses React Router in{' '}
          <code className="text-[#3d4452]">features/menu-router/ui/RouterMenuIntegration.tsx</code>
          . The headless menu in{' '}
          <code className="text-[#3d4452]">shared/ui/menu</code> (also re-exported from{' '}
          <code className="text-[#3d4452]">src/menu/</code>) never imports the router — only{' '}
          <code className="text-[#3d4452]">isActive</code> props from the consumer.
        </p>
      </div>
      <StateDrivenMenuExample />
    </div>
  )
}
