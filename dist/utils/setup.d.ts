import { SetupConfig, InstallationGuide } from '../types';
export declare class BrainKBSetup {
    private config;
    constructor(config: SetupConfig);
    generateInstallationCode(): string;
    generateReactInstallation(): string;
    generateNextJSInstallation(): string;
    generateWordPressInstallation(): string;
    private generateConfig;
    generateInstallationGuide(): InstallationGuide;
    generateOneClickSetup(): string;
}
export declare const quickSetup: {
    vanilla: (config: SetupConfig) => string;
    react: (config: SetupConfig) => string;
    nextjs: (config: SetupConfig) => string;
    wordpress: (config: SetupConfig) => string;
    oneClick: (config: SetupConfig) => string;
};
//# sourceMappingURL=setup.d.ts.map