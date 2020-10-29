import { IInputProvider, IOutputProvider, ICorpusRuleGroup, IClosure } from './types';
import { Logger } from 'log4js';
export interface IRuleHarvesterProviders {
    inputs: IInputProvider[];
    outputs: IOutputProvider[];
    corpus: ICorpusRuleGroup[];
    closures: IClosure[];
    logger?: Logger;
}
export interface IRuleHarvesterConfig {
    providers: IRuleHarvesterProviders;
    extraContext?: object | null;
    closureHandlerWrapper?: (facts: any, context: any, handler: (facts: any, context: any) => any | Promise<any>) => any | Promise<any>;
}
export * from './types';
export * from './generators';
export default class RuleHarvester {
    providers: IRuleHarvesterProviders;
    config: IRuleHarvesterConfig;
    engine: any;
    logger?: Logger;
    ruleGroups: string[];
    extraContext?: object | null;
    forbidenExtraContext: string[];
    /*****************
     * defaultClosureHandlerWrapper
     * This wraps the closure handler so that we log errors well
     ******************/
    defaultClosureHandlerWrapper(name: string, handler: (facts: any, context: any) => any | Promise<any>, options?: any): (facts: any, context: any) => any | Promise<any>;
    /**
     * closureHandlerWrapper
     * This function is a wrapper to allow us to override the context of closure functions.
     * it wraps the closure handler to supply extra context if the handler is defined.
     *
     * @param closure - The defined closure function
     * @return returns a wrapped closure function
     **/
    private closureHandlerWrapper;
    /**
     * Constructor
     * This function configures the engine.
     * 1. Instantiates the engine
     * 2. Sets up the engine corpus (definitions)
     * 3. Sets of the closers (Available funciton closures for the corpus to work from)
     * @params config: IRuleHarvesterConfig
     * @returns - None
     **/
    constructor(config: IRuleHarvesterConfig);
    /**
     * start the Rules Harvester.
     * Does this by...
     * 1. Does this by registering an input handler for each rule input
     * @params - None
     * @returns void
     **/
    start(): void;
    /**
     * applyRule - Applies the rule to the rules engine
     * If input is not null then ..
     * 1. Process rules using the rules engine
     * 2. Send the resulting facts to the output providers
     **/
    applyRule(input: any, thisRunContext?: any): Promise<any>;
}
