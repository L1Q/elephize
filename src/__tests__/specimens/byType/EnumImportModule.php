<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\byType;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;
use VK\Elephize\Builtins\ReactContext;

class EnumImportModule extends CJSModule {
    /**
     * @var EnumImportModule $_mod
     */
    private static $_mod;
    public static function getInstance(): EnumImportModule {
        if (!self::$_mod) {
            self::$_mod = new EnumImportModule();
        }
        return self::$_mod;
    }

    /**
     * @var string $enut4
     */
    public $enut4;

    private function __construct() {
        $this->enut4 = \specimens\byType\enum\ValuesBasedEnumEnum::LOL;
        \VK\Elephize\Builtins\Console::log($this->enut4);
    }
}
