<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ModifyFileModule extends CJSModule {
    /**
     * @var ModifyFileModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ModifyFileModule {
        if (!self::$_mod) {
            self::$_mod = new ModifyFileModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $b
     * @return float
     */
    public function mftest2($b) {
        $a = 1 + $b;
        return $a;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->mftest2(1));
    }
}
