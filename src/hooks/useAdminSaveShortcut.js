import { useEffect, useCallback, useRef } from 'react';

/**
 * useAdminSaveShortcut — Adds Ctrl+Enter / Cmd+Enter as a quick-save shortcut
 * in Admin Panel form pages.
 *
 * Usage:
 *   useAdminSaveShortcut(handleSubmit, saving);
 *
 * The hook:
 *   1. Listens for Ctrl+Enter (Windows/Linux) or Cmd+Enter (macOS)
 *   2. Calls the existing handleSubmit function
 *   3. Prevents duplicate requests while saving
 *   4. Prevents browser default action
 *   5. Finds and submits the nearest form on the page
 *
 * @param {Function} onSave   — The existing save/submit handler (e.g. handleSubmit)
 * @param {boolean}  isSaving — The existing saving/loading state flag
 */
export default function useAdminSaveShortcut(onSave, isSaving = false) {
  const savingRef = useRef(isSaving);

  // Keep ref in sync with prop
  useEffect(() => {
    savingRef.current = isSaving;
  }, [isSaving]);

  const handleKeyDown = useCallback(
    (event) => {
      // Only trigger on Ctrl+Enter or Cmd+Enter (macOS)
      if (!((event.ctrlKey || event.metaKey) && event.key === 'Enter')) {
        return;
      }

      // Prevent browser default (e.g. some browsers use Ctrl+Enter)
      event.preventDefault();
      event.stopPropagation();

      // Prevent duplicate save if already saving
      if (savingRef.current) {
        return;
      }

      // Try to find the form on the page and submit it natively
      // This ensures all native form validation runs before our handler
      const form = document.querySelector('form');
      if (form) {
        // Dispatch a submit event to trigger form validation + onSubmit handler
        const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
        form.dispatchEvent(submitEvent);

        if (!submitEvent.defaultPrevented) {
          // If no onSubmit handler prevented it, call our save directly
          if (onSave) {
            onSave({ preventDefault: () => {} });
          }
        }
      } else if (onSave) {
        // No form found — call save directly (for header save buttons)
        onSave({ preventDefault: () => {} });
      }
    },
    [onSave]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [handleKeyDown]);
}
