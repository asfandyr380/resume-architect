import { analytics, logEvent } from './firebase';

// Analytics event names
export const ANALYTICS_EVENTS = {
    // Template Events
    TEMPLATE_SELECTED: 'template_selected',
    TEMPLATE_PREVIEWED: 'template_previewed',

    // Theme Events
    THEME_TOGGLED: 'theme_toggled',

    // Download Events
    DOWNLOAD_PDF: 'download_pdf',
    DOWNLOAD_PNG: 'download_png',
    DOWNLOAD_STARTED: 'download_started',
    DOWNLOAD_COMPLETED: 'download_completed',
    DOWNLOAD_FAILED: 'download_failed',

    // Editor Events
    EDITOR_TAB_CHANGED: 'editor_tab_changed',
    RESUME_DATA_UPDATED: 'resume_data_updated',

    // AI Events
    AI_ENHANCEMENT_USED: 'ai_enhancement_used',
    AI_BULLET_GENERATED: 'ai_bullet_generated',

    // Page Events
    PAGE_VIEW: 'page_view',
    SESSION_START: 'session_start'
};

// Helper functions to track events
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (!analytics) return;

    try {
        logEvent(analytics, eventName, params);
    } catch (error) {
        console.error('Analytics event failed:', error);
    }
};

// Specific tracking functions for better type safety
export const trackTemplateSelection = (templateId: string) => {
    trackEvent(ANALYTICS_EVENTS.TEMPLATE_SELECTED, {
        template_id: templateId,
        timestamp: new Date().toISOString()
    });
};

export const trackThemeToggle = (newTheme: 'light' | 'dark') => {
    trackEvent(ANALYTICS_EVENTS.THEME_TOGGLED, {
        theme: newTheme,
        timestamp: new Date().toISOString()
    });
};

export const trackDownload = (format: 'pdf' | 'png', status: 'started' | 'completed' | 'failed', error?: string) => {
    const eventName = status === 'started'
        ? ANALYTICS_EVENTS.DOWNLOAD_STARTED
        : status === 'completed'
            ? ANALYTICS_EVENTS.DOWNLOAD_COMPLETED
            : ANALYTICS_EVENTS.DOWNLOAD_FAILED;

    trackEvent(eventName, {
        format,
        status,
        error: error || null,
        timestamp: new Date().toISOString()
    });
};

export const trackEditorTabChange = (tabName: string) => {
    trackEvent(ANALYTICS_EVENTS.EDITOR_TAB_CHANGED, {
        tab_name: tabName,
        timestamp: new Date().toISOString()
    });
};

export const trackAIUsage = (feature: 'enhance' | 'bullet', context: string) => {
    const eventName = feature === 'enhance'
        ? ANALYTICS_EVENTS.AI_ENHANCEMENT_USED
        : ANALYTICS_EVENTS.AI_BULLET_GENERATED;

    trackEvent(eventName, {
        feature,
        context,
        timestamp: new Date().toISOString()
    });
};

export const trackPageView = (pageName: string) => {
    trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
        page_name: pageName,
        timestamp: new Date().toISOString()
    });
};
