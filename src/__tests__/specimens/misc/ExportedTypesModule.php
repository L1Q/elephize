<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ExportedTypesModule extends CJSModule {
    /**
     * @var ExportedTypesModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ExportedTypesModule {
        if (!self::$_mod) {
            self::$_mod = new ExportedTypesModule();
        }
        return self::$_mod;
    }

    /**
     * @var float $just_const
     */
    public $just_const;

    private function __construct() {
        $this->just_const= 1;
    }
}
