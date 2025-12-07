import * as React from 'react';
import {buildBackendUrl} from '../config/api';

export type RemotePlan = {
    title: string;
    filename: string | null;
    description: string;
};

type UsePlansOptions = {
    autoLoad?: boolean;
    timeoutMs?: number;
    deps?: React.DependencyList;
};

export function parsePlansResponse(payload: any): RemotePlan[] {
    let plans: any[] = [];
    if (Array.isArray(payload)) {
        plans = payload;
    } else if (payload && Array.isArray(payload?.plans)) {
        plans = payload.plans;
    } else if (payload && Array.isArray(payload?.data)) {
        plans = payload.data;
    }

    return plans.map((plan: any, index: number) => {
        if (typeof plan === 'string') {
            return {title: plan, filename: null, description: '无文件'};
        }
        const title = plan?.name || `方案 ${index + 1}`;
        const filename = plan?.filename ?? null;
        return {
            title: String(title),
            filename: filename ? String(filename) : null,
            description: filename ? String(filename) : '无文件',
        };
    });
}

export function usePlans(options: UsePlansOptions = {}) {
    const {autoLoad = true, timeoutMs = 8000, deps = []} = options;
    const [plans, setPlans] = React.useState<RemotePlan[] | null>(null);
    const [loading, setLoading] = React.useState<boolean>(autoLoad);
    const [error, setError] = React.useState<string | null>(null);
    const mountedRef = React.useRef(true);

    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const loadPlans = React.useCallback(async () => {
        if (!mountedRef.current) return;
        setLoading(true);
        setError(null);
        setPlans(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const res = await fetch(buildBackendUrl('/plans'), {signal: controller.signal});
            clearTimeout(timeoutId);

            let data: any = null;
            try {
                data = await res.json();
            } catch (e) { /* ignore */
            }

            if (!res.ok) {
                throw new Error(data?.message || `获取方案失败，状态码：${res.status}`);
            }

            const remotePlans = parsePlansResponse(data);
            if (!mountedRef.current) return;
            setPlans(remotePlans);
            setLoading(false);
            setError(null);
        } catch (e: any) {
            clearTimeout(timeoutId);
            if (!mountedRef.current) return;
            const message = e?.name === 'AbortError' ? '请求超时，请重试' : (e?.message || String(e));
            setError(message);
            setLoading(false);
        }
    }, [timeoutMs]);

    React.useEffect(() => {
        if (!autoLoad) return;
        loadPlans();
    }, [autoLoad, loadPlans, ...deps]);

    return {
        plans,
        loading,
        error,
        reload: loadPlans,
    };
}

