<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace \specimens\mathMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ConstantsModule extends CJSModule {
    /**
     * @var ConstantsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ConstantsModule {
        if (!self::$_mod) {
            self::$_mod = new ConstantsModule();
        }
        return self::$_mod;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log(M_E);
        \VK\Elephize\Builtins\Console::log(M_LN2);
        \VK\Elephize\Builtins\Console::log(M_LN10);
        \VK\Elephize\Builtins\Console::log(M_LOG2E);
        \VK\Elephize\Builtins\Console::log(M_LOG10E);
        \VK\Elephize\Builtins\Console::log(M_PI);
        \VK\Elephize\Builtins\Console::log(M_SQRT1_2);
        \VK\Elephize\Builtins\Console::log(M_SQRT2);
    }
}
