<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace \specimens\components;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class TwoComponentsModule extends CJSModule {
    /**
     * @var TwoComponentsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): TwoComponentsModule {
        if (!self::$_mod) {
            self::$_mod = new TwoComponentsModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $default_props
     */
    public $default_props;

    private function __construct() {
        $this->default_props = [
            "onClick" => /* anon_e8c52de */ function () {
                return;
            },
            "initialValue" => "",
            "count" => 0,
        ];
    }
}
