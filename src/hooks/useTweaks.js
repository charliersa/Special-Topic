import { useState, useCallback } from 'react'

/**
 * useTweaks — 統一管理 tweak 值的 hook。
 * setTweak 同時:
 *   1. 更新本地 React state
 *   2. postMessage 給 host (edit mode 協定)
 *   3. 廣播 CustomEvent 供同頁面其他監聽者使用
 *
 * 支援兩種呼叫形式:
 *   setTweak('key', value)
 *   setTweak({ key: value, ... })
 */
export function useTweaks(defaults) {
  const [values, setValues] = useState(defaults)

  const setTweak = useCallback((keyOrEdits, val) => {
    const edits =
      typeof keyOrEdits === 'object' && keyOrEdits !== null
        ? keyOrEdits
        : { [keyOrEdits]: val }

    setValues((prev) => ({ ...prev, ...edits }))

    // host protocol — 讓 edit mode 面板同步
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*')
    // 同頁通知
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }))
  }, [])

  return [values, setTweak]
}
